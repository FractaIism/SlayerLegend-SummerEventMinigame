"use client";

import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";

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

  return (
      <svg className={styles.overlay} width={250} height={250}>
        <rect
          width={100}
          height={100}
          onClick={handleClick}
        />
      </svg>
  );
}