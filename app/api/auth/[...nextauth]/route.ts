import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  auth } from "@/lib/firebase";
import { firestore } from "@/lib/firebase-admin";

const handler = NextAuth({
  adapter: FirestoreAdapter(firestore),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
        credentials: {
        email:{label:'Email', type:'email'},
        password:{label:'Password', type:'password'}
    },
    async authorize(credentials){
     try {
        const userCred = await signInWithEmailAndPassword(auth,
            credentials?.email as string,
            credentials?.password as string
        )
        const user = userCred.user
        return {
            id: user.uid,
            email:user.email,
            name: user.displayName || ""
        }
     } catch (error) {
        console.log(error)
        return null
     }
    },

},
)
  ],

  session: {
    strategy: "jwt", // or "database" if you want sessions in Firestore
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET
}
);

export { handler as GET, handler as POST };
