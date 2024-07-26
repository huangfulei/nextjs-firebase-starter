import { Button } from "@pomotrack/ui/src/components/button";

import { TextComponent } from "~/app/_components/TextComponent";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // void api.post.all.prefetch();

  return (
    <main className="container h-screen py-16">
      <Button variant={"neutral"}>
        <TextComponent />
      </Button>
    </main>
  );
}
