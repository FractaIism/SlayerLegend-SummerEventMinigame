"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useContext } from "react";
import { range } from "lodash";
import { GlobalVariableContext } from "./providers.tsx";

export function GameBoard({
  moveSlayerTo,
}: {
  moveSlayerTo: (row: number, col: number) => void;
}) {
  return (
    <>
      <Image
        src="/images/minigame.png"
        alt="minigame.png"
        width={250}
        height={250}
      />
      <SVGOverlay moveSlayerTo={moveSlayerTo} />
    </>
  );
}

function SVGOverlay({
  moveSlayerTo,
}: {
  moveSlayerTo: (row: number, col: number) => void;
}) {
  function isValidBlock(row: number, col: number) {
    return validBlocks.some(([r, c]) => r === row && c === col);
  }

  const { startX, startY, blockSize, gapX, gapY } = useContext(
    GlobalVariableContext
  );

  const validBlocks = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 1],
    [1, 4],
    [2, 0],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ];

  return (
    <svg className={styles.overlay} width={250} height={250}>
      {range(5).map((row) =>
        range(5).map((col) =>
          isValidBlock(row, col) ? (
            <rect
              key={`${row}-${col}`}
              x={startX + col * blockSize + (col - 1) * gapX}
              y={startY + row * blockSize + (row - 1) * gapY}
              width={blockSize}
              height={blockSize}
              onClick={() => moveSlayerTo(row, col)}
            />
          ) : null
        )
      )}
    </svg>
  );
}
