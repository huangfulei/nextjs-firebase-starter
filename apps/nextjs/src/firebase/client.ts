import type { Analytics } from "firebase/analytics";
import type { FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

import { clientConfig } from "~/firebase/client-config";

export const getFirebaseApp = (): FirebaseApp => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(clientConfig);
};

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());

  // App relies only on server token. We make sure Firebase does not store credentials in the browser.
  // See: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/143
  void setPersistence(auth, inMemoryPersistence);

  return auth;
}

export const db = getFirestore(getFirebaseApp());

export const storage = getStorage(getFirebaseApp());
export const functions = getFunctions(getFirebaseApp());
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export const analytics =
  typeof window !== "undefined"
    ? getAnalytics(getFirebaseApp())
    : ({} as Analytics);
