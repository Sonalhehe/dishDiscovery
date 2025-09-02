// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPp_T2a4n-52a-rMvGk71-yS0gDqJ-33Y",
  authDomain: "dev-prototyper-231221.firebaseapp.com",
  projectId: "dev-prototyper-231221",
  storageBucket: "dev-prototyper-231221.appspot.com",
  messagingSenderId: "329188812676",
  appId: "1:329188812676:web:65f7c35f6a15757d5942ea"
};

// Initialize Firebase for SSR
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db: Firestore = getFirestore(app);

export { app, db };
