// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2-zCxF_miDtnVEMDnNVcj_7Mxyp6Te1w",
  authDomain: "otz-system.firebaseapp.com",
  projectId: "otz-system",
  storageBucket: "otz-system.firebasestorage.app",
  messagingSenderId: "586862655167",
  appId: "1:586862655167:web:8d2dce33d91de19539780a",
  measurementId: "G-7RNMK2D257"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// 
// const analytics = getAnalytics(app);


export { auth }
