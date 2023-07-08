import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const slayer = {
    baseWidth: 84,
    baseHeight: 122,
    scaleFactor: 0.4,
  }

  return (
    <main className={styles.main}>
      <Image
        src="/images/minigame.png"
        alt="minigame.png"
        width={250}
        height={250}
      />
      <Image
        className={styles.slayer}
        src="/images/slayer_summer.png"
        width={slayer.baseWidth * slayer.scaleFactor}
        height={slayer.baseHeight * slayer.scaleFactor}
        alt="slayer_summer.png"
      />
    </main>
  );
}
