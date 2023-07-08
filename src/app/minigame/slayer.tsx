"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Slayer({ row, col }: { row: number; col: number }) {
  const slayer = {
    baseWidth: 84,
    baseHeight: 122,
    scaleFactor: 0.4,
    getWidth() {
      return this.baseWidth * this.scaleFactor;
    },
    getHeight() {
      return this.baseHeight * this.scaleFactor;
    },
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
      width={slayer.getWidth()}
      height={slayer.getHeight()}
      alt="slayer_summer.png"
      style={{
        left: colToCssLeft(col),
        top: rowToCssTop(row),
      }}
    />
  );
}
