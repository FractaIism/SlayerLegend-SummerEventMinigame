"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Slayer } from "./slayer.tsx";
import { GameBoard } from "./board.tsx";
import { Providers } from "./providers.tsx";

export default function Home() {
  function moveSlayerTo(row: number, col: number) {
    setSlayerPosition({ row: row, col: col });
  }

  const [slayerPosition, setSlayerPosition] = useState({ row: 0, col: 0 });

  return (
    <main className={styles.main}>
      <Providers>
        <GameBoard moveSlayerTo={moveSlayerTo} />
        <Slayer row={slayerPosition.row} col={slayerPosition.col} />
      </Providers>
    </main>
  );
}
