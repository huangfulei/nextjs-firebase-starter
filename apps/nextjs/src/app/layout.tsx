import type { Metadata } from "next";
import type { Tokens } from "next-firebase-auth-edge";
import { getTokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";

import "~/app/globals.css";

import { cookies } from "next/headers";

import type { User } from "~/context/useAuthStore";
import { ThemeSelector } from "~/components/ThemeSelector";
import { NavMenuContainer } from "~/containers/NavMenuContainer";
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

export default async function RootLayout(props: { children: React.ReactNode }) {
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

  console.log("current user: ", user);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavMenuContainer />
        <ThemeSelector />
        {props.children}
      </body>
    </html>
  );
}
