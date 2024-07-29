import type { NextRequest } from "next/server";
import { userAgent } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import createIntlMiddleware from "next-intl/middleware";

import { locales } from "~/constants/APP";
import { env } from "~/env";

export async function middleware(request: NextRequest) {
  const { geo, headers } = request;
  const country = geo?.country ?? headers.get("CF-IPCountry") ?? "";

  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales: locales,
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: "en",
  });

  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

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
    debug: true,
    tenantId: "your-tenant-id",
    checkRevoked: true,
    handleValidToken: async (tokens) => {
      const response = handleI18nRouting(request);
      response.headers.set("x-geoip-country", country);
      response.headers.set("x-viewport", viewport);

      return response;
    },
    handleInvalidToken: async (reason) => {
      const response = handleI18nRouting(request);
      response.headers.set("x-geoip-country", country);
      response.headers.set("x-viewport", viewport);

      return response;
    },
    handleError: async (error) => {
      const response = handleI18nRouting(request);
      response.headers.set("x-geoip-country", country);
      response.headers.set("x-viewport", viewport);

      return response;
    },
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
