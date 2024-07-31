import { env } from "~/env";

export const serverConfig = {
  useSecureCookies: env.USE_SECURE_COOKIES === "true",
  firebaseApiKey: env.FIREBASE_API_KEY,
  serviceAccount: env.FIREBASE_ADMIN_PRIVATE_KEY
    ? {
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }
    : undefined,
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: env.AUTH_COOKIE_NAME,
  cookieSignatureKeys: [
    env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT,
    env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS,
  ],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
  // Set to false in Firebase Hosting environment due to https://stackoverflow.com/questions/44929653/firebase-cloud-function-wont-store-cookie-named-other-than-session
  enableMultipleCookies: true,
};
