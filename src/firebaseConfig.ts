import firebase from 'firebase/app';
import 'firebase/auth'; // Import Firebase authentication if you need it
import 'firebase/firestore'; // Import Firestore if you need it

const firebaseConfig = {
    apiKey: "AIzaSyBqB8kG-4eGwxud_-XXKELEZusPBhdwJEo",
    authDomain: "aweber-pw-validator.firebaseapp.com",
    projectId: "aweber-pw-validator",
    storageBucket: "aweber-pw-validator.appspot.com",
    messagingSenderId: "257045036995",
    appId: "1:257045036995:web:1187f4935c4ffa6fab8776",
    measurementId: "G-2Y0QBBCCWB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Optionally export Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default app;