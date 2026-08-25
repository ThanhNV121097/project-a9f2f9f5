import { GreetingScreen } from "../components/GreetingScreen";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

async function getGreeting() {
  const response = await fetch(`${apiBase}/v1/greeting`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("failed to load greeting");
  }

  return (await response.json()) as { greeting: string };
}

export default async function Home() {
  const { greeting } = await getGreeting();

  return <GreetingScreen greeting={greeting} />;
}
