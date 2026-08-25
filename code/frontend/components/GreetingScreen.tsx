"use client";

import { useEffect, useState } from "react";

import styles from "./GreetingScreen.module.css";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export function GreetingScreen() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    let active = true;

    fetch(`${apiBase}/v1/greeting`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to load greeting");
        }

        return response.json() as Promise<{ greeting: string }>;
      })
      .then(({ greeting }) => {
        if (active) setGreeting(greeting);
      })
      .catch(() => {
        if (active) setGreeting("");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main aria-label="Centered greeting screen" className={styles.screen}>
      <h1 className={styles.greeting}>{greeting}</h1>
    </main>
  );
}
