"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useContext } from "react";
import { GlobalVariableContext } from "./providers";

export function Slayer({ row, col }: { row: number; col: number }) {
  const ctx = useContext(GlobalVariableContext);

  const slayer = {
    baseWidth: 84,
    baseHeight: 122,
    scaleFactor: 0.26,
  };
  const faceLeft = (row + col > 4 || col === 4);

  function rowToCssTop(row: number): number {
    const blockTop = ctx.startY + row * (ctx.blockSize + ctx.gapY);
    const slayerHeight = slayer.baseHeight * slayer.scaleFactor;
    return blockTop + ctx.blockSize / 2 - slayerHeight * (4/5);
  }

  function colToCssLeft(col: number): number {
    const blockLeft = ctx.startX + col * (ctx.blockSize + ctx.gapX);
    const slayerWidth = slayer.baseWidth * slayer.scaleFactor;
    return blockLeft + ctx.blockSize / 2 - slayerWidth / 2;
  }

  return (
    <Image
      className={styles.slayer}
      src="/images/slayer_summer.png"
      width={slayer.baseWidth * slayer.scaleFactor}
      height={slayer.baseHeight * slayer.scaleFactor}
      alt="slayer_summer.png"
      style={{
        left: colToCssLeft(col),
        top: rowToCssTop(row),
        scale: faceLeft ? "1 1" : "-1 1",
      }}
    />
  );
}
