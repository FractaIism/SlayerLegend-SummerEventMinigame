import Image from "next/image";
import styles from "./page.module.css";
import Slayer from "./slayer.tsx";

export default function Home() {

  return (
    <main className={styles.main}>
      <Image
        src="/images/minigame.png"
        alt="minigame.png"
        width={250}
        height={250}
      />
      <Slayer />
    </main>
  );
}
