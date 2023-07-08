import Image from "next/image";
import styles from "./page.module.css";
import Slayer from "./slayer.tsx";
import GameBoard from "./board.tsx";

export default function Home() {
  return (
    <main className={styles.main}>
      <GameBoard />
      <Slayer />
    </main>
  );
}
