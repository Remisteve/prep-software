/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../otz-system-firebase-adminsdk-fbsvc-afb6ae1ca3.json'

const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : getApps()[0];

export const firestore = getFirestore();
