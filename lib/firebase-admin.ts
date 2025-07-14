import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from 'firebase-admin'
// import { getStorage } from "firebase-admin/storage";

const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
      })
    : getApps()[0];

const firestore = getFirestore();
const db = getFirestore(firebaseAdmin)
// const storage = getStorage().bucket()
const adminAuth = admin.auth()
export {db, firestore, adminAuth}
