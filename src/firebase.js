import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyPYztV4JwPwv0T9u6pIMgHpUBgIy8VtQ",
  authDomain: "mentalhealthchatbot-cc88e.firebaseapp.com",
  projectId: "mentalhealthchatbot-cc88e",
  storageBucket: "mentalhealthchatbot-cc88e.firebasestorage.app",
  messagingSenderId: "108742958158",
  appId: "1:108742958158:web:48307045b30ff174b0771f",
  measurementId: "G-3Y4P2JD8FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
