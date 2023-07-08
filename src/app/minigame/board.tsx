"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { range } from "lodash";

export default function GameBoard() {
  return (
    <>
      <Image
        src="/images/minigame.png"
        alt="minigame.png"
        width={250}
        height={250}
      />
      <SVGOverlay />
    </>
  );
}

function SVGOverlay() {
  function handleClick(e: React.MouseEvent<SVGRectElement>) {
    console.log(e.target);
  }

  const blockSize = 44;
  const gapX = 3.5;
  const gapY = 3.0;
  const startX = 11;
  const startY = 12;

  return (
    <svg className={styles.overlay} width={250} height={250}>
      {range(5).map((row) =>
        range(5).map((col) => (
          <rect
            key={`${row}-${col}`}
            x={startX + col * blockSize + (col - 1) * gapX}
            y={startY + row * blockSize + (row - 1) * gapY}
            width={blockSize}
            height={blockSize}
          />
        ))
      )}
    </svg>
  );
}
