// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1PmIbpgcNMPxJxO2XEKBKIn9Rq7Glolg",
  authDomain: "zoukunited-cfbbb.firebaseapp.com",
  projectId: "zoukunited-cfbbb",
  storageBucket: "zoukunited-cfbbb.firebasestorage.app",
  messagingSenderId: "421262188756",
  appId: "1:421262188756:web:d155f241784ae1a56f5b41"
};


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);

// Initialize Firebase (singleton pattern to avoid multiple instances)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Storage
export const storage = getStorage(app)

export { app, auth };