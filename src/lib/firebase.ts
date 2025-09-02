// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "dish-discovery-j2yrr",
  "appId": "1:711551915837:web:16f78bc3ad52fa624c1754",
  "storageBucket": "dish-discovery-j2yrr.firebasestorage.app",
  "apiKey": "AIzaSyDyE0-vHvbStTfboUI2O0s6_uMe8Ckspn8",
  "authDomain": "dish-discovery-j2yrr.firebaseapp.com",
  "messagingSenderId": "711551915837"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db: Firestore = getFirestore(app);

export { app, db };
