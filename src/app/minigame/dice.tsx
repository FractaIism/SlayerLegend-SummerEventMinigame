import diceStyles from "./dice.module.scss";
import iconStyles from "./icons.module.scss";
import { range } from "lodash";
import { ItemI, ItemsContext } from "./context.tsx";
import { useContext, ReactNode, Fragment } from "react";
import { Position } from "./slayer.tsx";
import { indexToPosition, isDice } from "./utils.tsx";

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
    <div className={diceStyles.calculator}>
      <DiceCalculatorRow>
        <DiceIcon className={diceStyles.dice_145} />
        <DiceCalculatorText slayerIndex={slayerIndex} moves={[1, 4, 5]} />
      </DiceCalculatorRow>
      <DiceCalculatorRow>
        <DiceIcon className={diceStyles.dice_236} />
        <DiceCalculatorText slayerIndex={slayerIndex} moves={[2, 3, 6]} />
      </DiceCalculatorRow>
    </div>
  );
}

function DiceCalculatorRow({ children }: { children: ReactNode }) {
  return <div className={diceStyles.calculatorRow}>{children}</div>;
}

function DiceIcon({ className }: { className: string }) {
  return <div className={`${diceStyles.diceIcon} ${className}`}></div>;
}

type EventuallyReachableItem = ItemI | ItemI[][];

function DiceCalculatorText({
  slayerIndex,
  moves,
}: {
  slayerIndex: number;
  moves: number[];
}) {
  function getReachableItems(
    items: ItemI[],
    slayerIndex: number,
    moves: number[]
  ): ItemI[] {
    const reachableIndexes = moves.map((n) => (slayerIndex + n) % 16);
    const reachableItems = reachableIndexes.map(
      (idx) => items.filter((item) => item.indexes.includes(idx))[0]
    );
    return reachableItems;
  }

  function getEventuallyReachableItems(
    items: ItemI[],
    slayerIndex: number,
    moves: number[]
  ): EventuallyReachableItem[] {
    const firstMoveReachableItems = getReachableItems(
      items,
      slayerIndex,
      moves
    );
    const eventuallyReachableItems = firstMoveReachableItems.map((item, i) => {
      return isDice(item)
        ? [
            getReachableItems(items, slayerIndex + i, [1, 4, 5]),
            getReachableItems(items, slayerIndex + i, [2, 3, 6]),
          ]
        : item;
    });
    return eventuallyReachableItems;
  }

  function computeWeightedAverage(
    items: ItemI[],
    slayerIndex: number,
    moves: number[]
  ) {
    const reachableItems = getReachableItems(items, slayerIndex, moves);
    const weightedAvg = reachableItems.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    return weightedAvg;
  }

  const [items, updateItems] = useContext(ItemsContext);
  const eventuallyReachableItems = getEventuallyReachableItems(
    items,
    slayerIndex,
    moves
  );
  const weightedAvg = computeWeightedAverage(items, slayerIndex, moves);

  return (
    <div style={{ display: "inline-block" }}>
      {weightedAvg.toFixed(1) + " = "}
      <DiceCalculatorTextSegment
        eventuallyReachableItems={eventuallyReachableItems}
      />
    </div>
  );
}

function DiceCalculatorTextSegment({
  eventuallyReachableItems,
}: {
  eventuallyReachableItems: EventuallyReachableItem[];
}) {
  return (
    <>
      {eventuallyReachableItems.map((item, i) => (
        <>
          {(i === 0 ? "" : " + ")}
          {Array.isArray(item) ? (
            <Fragment key={Math.random()}>
              {"Max("}
              <DiceCalculatorTextSegment
                key={1}
                eventuallyReachableItems={item[0]}
              />
              {" , "}
              <DiceCalculatorTextSegment
                key={2}
                eventuallyReachableItems={item[1]}
              />
              {")"}
            </Fragment>
          ) : (
            <DiceCalculatorItemWithWeight key={item.className} item={item} />
          )}
        </>
      ))}
    </>
  );
}

function DiceCalculatorItemWithWeight({ item }: { item: ItemI }) {
  return (
    <>
      <div
        className={`${iconStyles.blockIcon} ${item.className}`}
        style={{ display: "inline-block" }}
      />
      {item.weight}
    </>
  );
}
