// Import the functions you need from the SDKs you need

import type { Analytics } from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

import { env } from "~/env";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

export const db = getFirestore(app);

export const storage = getStorage(app);
export const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export const auth = getAuth(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics() : ({} as Analytics);
