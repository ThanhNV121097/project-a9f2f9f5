import styles from "./GreetingScreen.module.css";

export function GreetingScreen({ greeting }: { greeting: string }) {
  return (
    <main aria-label="Centered greeting screen" className={styles.screen}>
      <h1 className={styles.greeting}>{greeting}</h1>
    </main>
  );
}
