// app/api/auth/[...nextauth]/route.ts or pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminAuth, db, firestore } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Extend NextAuth types to include custom user/session properties
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      permissions: string[];
      isActive: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    role?: string;
    permissions?: string[];
    isActive?: boolean;
  }
}

const handler = NextAuth({
  adapter: FirestoreAdapter(firestore),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isSignUp: { label: 'Sign Up', type: 'hidden' }
      },
      async authorize(credentials) {
        console.log('🔐 Credentials received:', { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password,
          isSignUp: credentials?.isSignUp 
        });

        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Missing credentials');
            return null;
          }

          const { email, password, isSignUp } = credentials;

          if (isSignUp === 'true') {
            console.log('📝 Creating new admin user');
            
            // Create new admin user using Firebase Admin SDK
            const firebaseUser = await adminAuth.createUser({
              email: email,
              password: password,
              emailVerified: true
            });

            console.log('✅ Firebase user created:', firebaseUser.uid);

            // Save to firestore with admin role
            await db.collection('users').doc(firebaseUser.uid).set({
              email: firebaseUser.email,
              role: 'admin',
              createdAt: FieldValue.serverTimestamp(),
              lastLogin: FieldValue.serverTimestamp(),
              isActive: true,
              permissions: ['read', 'write', 'delete', 'manage_users'],
              provider: 'email'
            });

            // Set custom claims for immediate role access
            await adminAuth.setCustomUserClaims(firebaseUser.uid, {
              role: 'admin',
              permissions: ['read', 'write', 'delete', 'manage_users']
            });

            console.log('✅ User profile created with admin role');

            return {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || email.split('@')[0]
            };
          } else {
            console.log('🔑 Authenticating existing user');
            
            // First check if user exists in Firebase Admin
            let existingUser;
            try {
              existingUser = await adminAuth.getUserByEmail(email);
              console.log('✅ User found in Firebase:', existingUser.uid);
            } catch {
              console.log('❌ User not found in Firebase');
              return null;
            }

            // Validate password using Firebase Auth REST API
            const authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            });

            const authData = await authResponse.json();

            if (!authResponse.ok) {
              console.log('❌ Firebase Auth error:', authData.error);
              return null;
            }

            console.log('✅ Password validated successfully');

            // Update last login
            await db.collection('users').doc(existingUser.uid).update({
              lastLogin: FieldValue.serverTimestamp()
            });

            return {
              id: existingUser.uid,
              email: existingUser.email,
              name: existingUser.displayName || email.split('@')[0]
            };
          }
        } catch (error) {
          console.error('❌ Credentials auth error:', error);
          return null;
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account }) {
      console.log('🔄 SignIn callback:', { provider: account?.provider, email: user.email });
      
      if (account?.provider === 'google') {
        try {
          let firebaseUser;
          try {
            if (!user?.email) {
              throw new Error('User email is undefined');
            }
            firebaseUser = await adminAuth.getUserByEmail(user.email);
            console.log('✅ Google user found in Firebase');
          } catch  {
            console.log('📝 Creating new Google user in Firebase');
            firebaseUser = await adminAuth.createUser({
              uid: user.id,
              email: user.email!,
              displayName: user.name!,
              photoURL: user.image!,
              emailVerified: true
            });
          }

          // Check if user profile exists in Firestore
          const userDoc = await db.collection('users').doc(firebaseUser.uid).get();

          if (!userDoc.exists) {
            // Create normal user profile for Google auth
            await db.collection('users').doc(firebaseUser.uid).set({
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'user',
              provider: 'google',
              createdAt: FieldValue.serverTimestamp(),
              lastLogin: FieldValue.serverTimestamp(),
              isActive: true,
              permissions: ['read']
            });

            // Set custom claims for normal user
            await adminAuth.setCustomUserClaims(firebaseUser.uid, {
              role: 'user',
              permissions: ['read']
            });
          } else {
            // Update last login
            await db.collection('users').doc(firebaseUser.uid).update({
              lastLogin: FieldValue.serverTimestamp()
            });
          }

          user.id = firebaseUser.uid;
          return true;
        } catch (error) {
          console.error('❌ Google sign-in error:', error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        
        // Get user data from Firestore to include role and permissions
        try {
          const userDoc = await db.collection('users').doc(user.id).get();
          const userData = userDoc.data();
          
          token.role = userData?.role || 'user';
          token.permissions = userData?.permissions || ['read'];
          token.isActive = userData?.isActive !== false;
          
          console.log('✅ JWT updated with user data:', { 
            uid: token.uid, 
            role: token.role,
            isActive: token.isActive 
          });
        } catch (error) {
          console.error('❌ Error fetching user data for JWT:', error);
          token.role = 'user';
          token.permissions = ['read'];
          token.isActive = false;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log('🔄 Redirect callback:', { url, baseUrl });
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },

  debug: process.env.NODE_ENV === 'development',
  
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };

