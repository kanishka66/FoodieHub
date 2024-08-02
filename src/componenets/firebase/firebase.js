import { initializeApp } from "firebase/app";
import{getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCjHoouSnZQm2QxtakkJcDYY-fzcpeT0K8",
  authDomain: "jodhpur-87370.firebaseapp.com",
  projectId: "jodhpur-87370",
  storageBucket: "jodhpur-87370.appspot.com",
  messagingSenderId: "644858691881",
  appId: "1:644858691881:web:a36493016ef327915b7738",
  measurementId: "G-6LR23T0QR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const dishrev=collection(db,"dishes");
export const reviewsref=collection(db,"Reviews");
export const usersref=collection(db,"users");

export default app;