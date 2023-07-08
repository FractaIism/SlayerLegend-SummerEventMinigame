"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Slayer from "./slayer.tsx";
import GameBoard from "./board.tsx";

export default function Home() {
  function moveSlayerTo(row: number, col: number) {
    setSlayerPosition({row: row, col: col})
  }

  const [slayerPosition, setSlayerPosition] = useState({ row: 0, col: 0 });

  return (
    <main className={styles.main}>
      <GameBoard
        moveSlayerTo={moveSlayerTo}
      />
      <Slayer
        row={slayerPosition.row}
        col={slayerPosition.col}
      />
    </main>
  );
}
