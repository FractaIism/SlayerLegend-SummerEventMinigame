"use client";

import Image from "next/image";
import styles from "./board.module.scss";
import { useContext, ReactNode } from "react";
import { range } from "lodash";
import { GlobalVariableContext } from "./context.tsx";
import { Position } from "./types.tsx";

const boardSize = 250;

export function GameBoard({
  setSlayerPosition,
  children,
}: {
  setSlayerPosition: (position: Position) => void;
  children: ReactNode;
}) {
  return (
    <>
      <Image
        src="/images/minigame.png"
        alt="minigame.png"
        width={boardSize}
        height={boardSize}
      />
      <SVGOverlay setSlayerPosition={setSlayerPosition} />
      {children}
    </>
  );
}

function SVGOverlay({
  setSlayerPosition,
}: {
  setSlayerPosition: (position: Position) => void;
}) {
  function blockExists(row: number, col: number) {
    return validPositions.some(({ row: r, col: c }) => r === row && c === col);
  }

  const { startX, startY, blockSize, gapX, gapY, validPositions } = useContext(
    GlobalVariableContext
  );

  // range(5).map((row) =>
  //   range(5).map((col) => blockExists(row, col)
  //     && console.log(startX+col*(blockSize+gapX), startY+row*(blockSize+gapY))
  //   )
  // );
  return (
    <svg className={styles.overlay} width={boardSize} height={boardSize}>
      {range(5).map((row) =>
        range(5).map((col) =>
          blockExists(row, col) ? (
            <rect
              className={styles.overlayBlock}
              key={`${row}-${col}`}
              x={startX + col * (blockSize + gapX)}
              y={startY + row * (blockSize + gapY)}
              width={blockSize}
              height={blockSize}
              onClick={() => setSlayerPosition({ row: row, col: col })}
            />
          ) : null
        )
      )}
    </svg>
  );
}
