import type { NextRequest } from "next/server";
import { userAgent } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import createIntlMiddleware from "next-intl/middleware";

import { locales } from "~/constants/APP";
import { authConfig } from "./config/server-config";

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
    refreshTokenPath: "/api/refresh-token",
    enableMultipleCookies: authConfig.enableMultipleCookies,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
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
