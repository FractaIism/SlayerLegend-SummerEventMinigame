"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Slayer() {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const slayer = {
    baseWidth: 84,
    baseHeight: 122,
    scaleFactor: 0.4,
    getWidth() { return this.baseWidth * this.scaleFactor; },
    getHeight() { return this.baseHeight * this.scaleFactor; },
  }

  function moveSlayer(top: number, left: number) {
    
  }
  
  return (
    <Image
      className={styles.slayer}
      style={{
        left: 0,
      }}
      src="/images/slayer_summer.png"
      width={slayer.getWidth()}
      height={slayer.getHeight()}
      alt="slayer_summer.png"
    />
  );
}