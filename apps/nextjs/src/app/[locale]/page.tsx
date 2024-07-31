import { cookies } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";

import { Button } from "@pomotrack/ui/src/components/button";

import { TextComponent } from "~/components/TextComponent";
import { env } from "~/env";

export default async function HomePage() {
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

  if (!tokens) {
    // notFound();
    return null;
  } else {
    console.log("token:", tokens);
  }

  return (
    <main className="container h-screen py-16">
      <Button variant={"neutral"}>
        <TextComponent />
      </Button>
      <TextComponent />
    </main>
  );
}
