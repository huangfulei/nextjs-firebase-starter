"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Button, Container, Section } from "@pomotrack/ui";

import { incrementCounter } from "~/app/[locale]/actions/user-counters";
import { useAuth } from "~/context/AuthContext";
import { getFirebaseApp } from "~/firebase/client";
import { useLoadingCallback } from "~/hooks/useLoadingCallback";

interface CounterProps {
  count: number;
}
export const Counter = (props: CounterProps) => {
  const { count } = props;
  const { user } = useAuth();
  const router = useRouter();

  const [callClient, isIncrementCounterClientLoading] = useLoadingCallback(
    async () => {
      if (!user) {
        return;
      }

      const db = getFirestore(getFirebaseApp());
      const docRef = doc(db, "user-counters", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        await updateDoc(docRef, { count: data.count + 1 });
      } else {
        await setDoc(docRef, { count: 1 });
      }

      router.refresh();
    },
  );

  const [isIncrementCounterServerLoading, startTransition] = useTransition();

  const [callApi, isIncrementCounterApiLoading] = useLoadingCallback(
    async () => {
      const response = await fetch("/api/user-counters", {
        method: "POST",
      });

      await response.json();
      router.refresh();
    },
  );

  return (
    <Container>
      <h3>Counter: {count}</h3>
      <Section>
        <Button onClick={callClient} disabled={isIncrementCounterClientLoading}>
          Increase counter using client action
        </Button>
        <Button
          onClick={() => startTransition(() => incrementCounter())}
          disabled={isIncrementCounterServerLoading}
        >
          Increase counter using server action
        </Button>
        <Button onClick={callApi} disabled={isIncrementCounterApiLoading}>
          Increase counter using api route
        </Button>
      </Section>
    </Container>
  );
};
