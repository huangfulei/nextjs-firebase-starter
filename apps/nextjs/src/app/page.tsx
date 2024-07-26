import { Button } from "@pomotrack/ui/src/components/button";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // void api.post.all.prefetch();

  return (
    <main className="container h-screen py-16">
      <Button variant={"neutral"}>hello world</Button>
    </main>
  );
}
