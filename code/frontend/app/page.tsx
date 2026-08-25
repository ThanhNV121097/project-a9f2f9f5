import { GreetingScreen } from "@/components/GreetingScreen";
import { greetingMock } from "@/lib/mock/store-greeting-in-db";

export default function Home() {
  return <GreetingScreen greeting={greetingMock.greeting} />;
}
