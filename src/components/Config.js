// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwv4ZZ-lFHLugEruhcg8USiYxzgVUA-yw",
  authDomain: "appfire-902cb.firebaseapp.com",
  projectId: "appfire-902cb",
  storageBucket: "appfire-902cb.appspot.com",
  messagingSenderId: "610026128441",
  appId: "1:610026128441:web:e06d289fcfb541bf6cf9e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider(app);