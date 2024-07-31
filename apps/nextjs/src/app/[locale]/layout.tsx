import type { Metadata } from "next";

import "~/globals.css";

import { cookies, headers } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { NavMenu } from "~/app/[locale]/_components/navMenu/NavMenu";
import { AuthProvider } from "~/context/AuthProvider";
import { env } from "~/env";
import { authConfig } from "~/firebase/server-config";
import { toUser } from "~/firebase/user";

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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const tokens = await getTokens(cookies(), {
    ...authConfig,
    headers: headers(),
  });
  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang={locale} suppressHydrationWarning data-theme="light">
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider user={user}>
            <NavMenu />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
