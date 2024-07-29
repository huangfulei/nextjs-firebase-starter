import { NextRequest } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";

import { env } from "~/env";

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    cookieName: env.AUTH_COOKIE_NAME,
    cookieSignatureKeys: [
      env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT,
      env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS,
    ],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    serviceAccount: {
      projectId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
    },
    enableMultipleCookies: true, // Recommended, but `false` by default to keep backwards compatibility. Set to false on Firebase Hosting due to https://stackoverflow.com/questions/44929653/firebase-cloud-function-wont-store-cookie-named-other-than-session
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
