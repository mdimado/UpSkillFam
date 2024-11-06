import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyATQXI6JdvrRrDOnEQwm8Zkl6L_H9D9p5w",
  authDomain: "upskillfam.firebaseapp.com",
  projectId: "upskillfam",
  storageBucket: "upskillfam.appspot.com",
  messagingSenderId: "502712882651",
  appId: "1:502712882651:web:d7b51c80f4af74a376c3fe",
  measurementId: "G-0PB22B45ES"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);