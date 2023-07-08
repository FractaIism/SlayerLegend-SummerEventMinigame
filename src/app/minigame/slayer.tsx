"use client";

import Image from "next/image";
import styles from "./page.module.css";

export function Slayer({ row, col }: { row: number; col: number }) {
  const slayer = {
    baseWidth: 84,
    baseHeight: 122,
    scaleFactor: 0.4,
  };

  function rowToCssTop(row: number): number {
    return row;
  }

  function colToCssLeft(col: number): number {
    return col;
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
      }}
    />
  );
}
