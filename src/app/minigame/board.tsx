"use client";

import Image from "next/image";
import styles from "./board.module.scss";
import { useContext, ReactNode, MouseEventHandler } from "react";
import { range } from "lodash";
import { GlobalVariableContext } from "./context.tsx";
import { Position } from "./slayer.tsx";
import { positionToIndex } from "./utils.tsx";

const boardSize = 250;

export function GameBoard({
  slayerPosition,
  setSlayerPosition,
  children,
}: {
  slayerPosition: Position;
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
      <DecorativeSVGOverlay slayerPosition={slayerPosition} />
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

function DecorativeSVGOverlay({
  slayerPosition,
}: {
  slayerPosition: Position;
}) {
  function blockExists(row: number, col: number) {
    return validPositions.some(({ row: r, col: c }) => r === row && c === col);
  }

  function isBlockReachable(
    blockIndex: number,
    slayerIndex: number,
    moves: number[],
  ) {
    const teleportBlocks: { [key: number]: number } = { 7: 2, 14: 9 };
    const nextSlayerIndexes = moves.map((n) => (slayerIndex + n) % 16);
    const nextSlayerIndexes2 = nextSlayerIndexes.map((idx) =>
      idx in teleportBlocks ? teleportBlocks[idx] : idx,
    );
    return nextSlayerIndexes2.includes(blockIndex);
  }

  const { validPositions } = useContext(GlobalVariableContext);

  const slayerIndex = positionToIndex(slayerPosition);

  return (
    <svg className={styles.overlay} width={boardSize} height={boardSize}>
      {range(5).map((row) =>
        range(5).map((col) => {
          const blockIndex = positionToIndex({ row, col });
          const r145 = isBlockReachable(blockIndex, slayerIndex, [1, 4, 5]);
          const r236 = isBlockReachable(blockIndex, slayerIndex, [2, 3, 6]);
          const blockClassName = r145 ? styles.cyan : r236 ? styles.violet : "";
          if (blockExists(row, col)) {
            return (
              <SVGRectBlock
                key={`${row}-${col}`}
                row={row}
                col={col}
                className={`${styles.overlayBlockVisible} ${blockClassName}`}
              />
            );
          }
        }),
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
