"use client";

import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Button, Container, HStack, Section, VStack } from "@pomotrack/ui";

import { incrementCounter } from "~/app/[locale]/anotherpage/actions/incrementCounter";
import { useAuth } from "~/context/AuthContext";
import { getFirebaseApp } from "~/firebase/client";
import { useLoadingCallback } from "~/hooks/useLoadingCallback";
import { useRouter } from "~/navigation";

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

  const [callServer, isIncrementCounterServerLoading] = useLoadingCallback(
    async () => {
      await incrementCounter();
    },
  );

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
    <Container className={"text-center"}>
      <h3>Counter: {count}</h3>
      <Section>
        <VStack className={"gap-2"}>
          <Button
            onClick={callClient}
            disabled={isIncrementCounterClientLoading}
          >
            Increase counter using client action
          </Button>
          <Button
            onClick={callServer}
            disabled={isIncrementCounterServerLoading}
          >
            Increase counter using server action
          </Button>
          <Button onClick={callApi} disabled={isIncrementCounterApiLoading}>
            Increase counter using api route
          </Button>
        </VStack>
      </Section>
    </Container>
  );
};
