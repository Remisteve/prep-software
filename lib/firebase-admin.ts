import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../otz-system-firebase-adminsdk-fbsvc-afb6ae1ca3.json'
import admin from 'firebase-admin'
const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : getApps()[0];

const firestore = getFirestore();
const db = getFirestore(firebaseAdmin)
const adminAuth = admin.auth()
export {db, firestore, adminAuth}
