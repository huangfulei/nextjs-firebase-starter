import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";

import { Text } from "@pomotrack/ui";

import { env } from "~/env";

const Protected = async () => {
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
    notFound();
  } else {
    console.log("token:", tokens);
  }
  return <Text>only signed in user can see it</Text>;
};

export default Protected;
