import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const slayerBaseWidth = 84;
  const slayerBaseHeight = 122;
  const slayerScaleFactor = 0.4;

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
        width={slayerBaseWidth * slayerScaleFactor}
        height={slayerBaseHeight * slayerScaleFactor}
        alt="slayer_summer.png"
      />
    </main>
  );
}
