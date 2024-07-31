import type { App } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import { authConfig } from "~/firebase/server-config";

const initializeApp = () => {
  if (!authConfig.serviceAccount) {
    return admin.initializeApp();
  }

  return admin.initializeApp({
    credential: admin.credential.cert(authConfig.serviceAccount),
  });
};

export const getFirebaseAdminApp = (): App => {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  // admin.firestore.setLogFunction(console.log);

  return initializeApp();
};

export const db = getFirestore(getFirebaseAdminApp());
