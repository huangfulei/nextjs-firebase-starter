import { cookies, headers } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";

import { Container, Text } from "@pomotrack/ui";

import { authConfig } from "~/firebase/server-config";
import { toUser } from "~/firebase/user";
import { Link } from "~/navigation";

export async function generateStaticParams() {
  return [{}];
}

export default async function HomePage() {
  const tokens = await getTokens(cookies(), {
    ...authConfig,
    headers: headers(),
  });
  const user = tokens ? toUser(tokens) : null;
  return (
    <Container>
      {user ? (
        <Text>
          Hello {user.displayName} click{" "}
          <Link className={"link"} href={"/anotherpage"}>
            here
          </Link>{" "}
          to the next page!
        </Text>
      ) : (
        <Text>Please log in!</Text>
      )}
    </Container>
  );
}
