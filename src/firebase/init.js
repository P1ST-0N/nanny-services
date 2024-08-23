// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import store from "../redux/store";
import authOperations from "../redux/auth/operations";
import favoritesOperations from "../redux/favorites/operations";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase();

export const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { email, displayName, photoURL, uid } = user;
    store.dispatch(
      authOperations.loginSync({ email, displayName, photoURL, uid })
    );
    store.dispatch(authOperations.getTheme(uid));
    store.dispatch(favoritesOperations.getAll());
  } else {
    store.dispatch(authOperations.logoutSync());
    store.dispatch(favoritesOperations.clearSync());
  }
});
