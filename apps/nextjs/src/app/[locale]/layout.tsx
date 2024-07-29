import type { Metadata } from "next";
import type { Tokens } from "next-firebase-auth-edge";
import { getTokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";

import "~/globals.css";

import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import type { User } from "~/context/useAuthStore";
import { NavMenu } from "~/app/[locale]/_components/navMenu/NavMenu";
import { ThemeSelector } from "~/app/[locale]/_components/ThemeSelector";
import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://www.pomotrack.com"
      : "http://localhost:3000",
  ),
  title: "Pomotrack",
  description: "pomodoro timer with matrix",
  openGraph: {
    title: "Pomotrack",
    description: "pomodoro timer with matrix",
    url: "https://www.pomotrack.com",
    siteName: "Pomotrack",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pomotrack",
    creator: "@pomotrack",
  },
};

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;

  const customClaims = filterStandardClaims(decodedToken);

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tokens = await getTokens(cookies(), {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    cookieName: env.AUTH_COOKIE_NAME,
    cookieSignatureKeys: [
      env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT,
      env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS,
    ],
    serviceAccount: {
      projectId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
    },
  });
  const user = tokens ? toUser(tokens) : null;
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning data-theme="light">
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavMenu />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
