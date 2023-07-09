"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { Slayer } from "./slayer.tsx";
import { GameBoard } from "./board.tsx";
import { Providers } from "./context.tsx";
import { Position } from "./types.tsx";
import { Weights } from "./weights.tsx";

export default function Home() {
  const [slayerPosition, setSlayerPosition]: [Position, any] = useState({
    row: 4,
    col: 4,
  });

  return (
    <main className={styles.main}>
      <Providers>
        <GameBoard setSlayerPosition={setSlayerPosition}>
          <Slayer position={slayerPosition} />
        </GameBoard>
        <Weights sortByWeight={true} />
      </Providers>
    </main>
  );
}
