import { cookies } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";

import { Button } from "@pomotrack/ui/src/components/button";

import { Counter } from "~/app/[locale]/_components/Counter";
import { useAuth } from "~/context/AuthContext";
import { env } from "~/env";
import { db } from "~/firebase/server";
import { authConfig } from "~/firebase/server-config";

async function getUserCounter(): Promise<number> {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    throw new Error("Cannot get counter of unauthenticated user");
  }

  const snapshot = await db
    .collection("user-counters")
    .doc(tokens.decodedToken.uid)
    .get();

  const currentUserCounter = await snapshot.data();

  if (!currentUserCounter) {
    return 0;
  }

  return currentUserCounter.count;
}

export default async function CounterPage() {
  const count = await getUserCounter();

  return (
    <main className="container h-screen py-16">
      <Counter count={count} />
    </main>
  );
}
