import diceStyles from "./dice.module.scss";
import iconStyles from "./icons.module.scss";
import { range } from "lodash";
import { ItemsContext } from "./context.tsx";
import { useContext, ReactNode } from "react";
import { Position } from "./slayer.tsx";
import { indexToPosition } from "./utils.tsx";

export function DiceCalculator({
  slayerPosition,
}: {
  slayerPosition: Position;
}) {
  const slayerIndex = range(16).find((idx) => {
    const pos = indexToPosition(idx);
    return pos.row === slayerPosition.row && pos.col === slayerPosition.col;
  });

  if (slayerIndex === undefined) {
    throw `slayer index not found: ${slayerIndex}`;
  }

  return (
    <>
      <DiceCalculatorRow>
        <div className={`${diceStyles.diceIcon} ${diceStyles.dice_145}`}></div>
        <DiceCalculatorText slayerIndex={slayerIndex} moves={[1, 4, 5]} />
      </DiceCalculatorRow>
      <DiceCalculatorRow>
        <div className={`${diceStyles.diceIcon} ${diceStyles.dice_236}`}></div>
        <DiceCalculatorText slayerIndex={slayerIndex} moves={[2, 3, 6]} />
      </DiceCalculatorRow>
    </>
  );
}

function DiceCalculatorRow({ children }: { children: ReactNode }) {
  return <div className={diceStyles.calculatorRow}>{children}</div>;
}

function DiceCalculatorText({
  slayerIndex,
  moves,
}: {
  slayerIndex: number;
  moves: number[];
}) {
  const [items, updateItems] = useContext(ItemsContext);
  const reachableIndexes = moves.map((n) => (slayerIndex + n) % 16);
  const reachableItems = reachableIndexes.map(
    (idx) => items.filter((item) => item.indexes.includes(idx))[0]
  );

  return (
    <div style={{display:"inline-block"}}>
      {reachableItems.map((item) => {
        return (
          <div
            key={item.className}
            className={`${iconStyles.blockIcon} ${item.className}`}
            style={{ display: "inline-block" }}
          />
        );
      })}
    </div>
  );
}
