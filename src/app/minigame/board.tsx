"use client";

import Image from "next/image";
import styles from "./board.module.scss";
import { useContext, ReactNode, MouseEventHandler } from "react";
import { range } from "lodash";
import { GlobalVariableContext } from "./context.tsx";
import { Position } from "./slayer.tsx";

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
      <DecorativeSVGOverlay />
      <FunctionalSVGOverlay setSlayerPosition={setSlayerPosition} />
      {children}
    </>
  );
}

function FunctionalSVGOverlay({
  setSlayerPosition,
}: {
  setSlayerPosition: (position: Position) => void;
}) {
  function blockExists(row: number, col: number) {
    return validPositions.some(({ row: r, col: c }) => r === row && c === col);
  }

  const { validPositions } = useContext(GlobalVariableContext);

  return (
    <svg className={styles.overlay} width={boardSize} height={boardSize}>
      {range(5).map((row) =>
        range(5).map((col) =>
          blockExists(row, col) ? (
            <SVGRectBlock
              key={`${row}-${col}`}
              row={row}
              col={col}
              className={styles.overlayBlockInvisible}
              onClick={() => setSlayerPosition({ row: row, col: col })}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

function DecorativeSVGOverlay() {
  function blockExists(row: number, col: number) {
    return validPositions.some(({ row: r, col: c }) => r === row && c === col);
  }

  const { validPositions } = useContext(GlobalVariableContext);

  return (
    <svg className={styles.overlay} width={boardSize} height={boardSize}>
      {range(5).map((row) =>
        range(5).map((col) =>
          blockExists(row, col) ? (
            <SVGRectBlock
              key={`${row}-${col}`}
              row={row}
              col={col}
              className={styles.overlayBlockVisible}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

function SVGRectBlock({
  row,
  col,
  className,
  onClick = undefined,
}: {
  row: number;
  col: number;
  className: string;
  onClick?: () => void;
}) {
  const ctx = useContext(GlobalVariableContext);
  return (
    <rect
      className={className}
      x={ctx.startX + col * (ctx.blockSize + ctx.gapX)}
      y={ctx.startY + row * (ctx.blockSize + ctx.gapY)}
      rx="3px"
      ry="3px"
      width={ctx.blockSize}
      height={ctx.blockSize}
      onClick={onClick ?? (() => null)}
    />
  );
}

// blockExists(row, col) ? (
//   <rect
//     className={
//       isStatic
//         ? styles.overlayBlockInvisible
//         : styles.overlayBlockVisible
//     }
//     key={`${row}-${col}`}
//     x={startX + col * (blockSize + gapX)}
//     y={startY + row * (blockSize + gapY)}
//     rx="3px"
//     ry="3px"
//     width={blockSize}
//     height={blockSize}
//     onClick={
//       setSlayerPosition
//         ? () => setSlayerPosition({ row: row, col: col })
//         : () => null
//     }
//   />
// ) : null,
