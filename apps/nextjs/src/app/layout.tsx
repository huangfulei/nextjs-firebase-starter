import type { Metadata } from "next";

import "~/app/globals.css";

import { ThemeSelector } from "~/components/ThemeSelector";
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeSelector />
        {props.children}
      </body>
    </html>
  );
}
