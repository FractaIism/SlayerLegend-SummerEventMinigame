import diceStyles from "./dice.module.scss";
import iconStyles from "./icons.module.scss";
import { range } from "lodash";
import { ItemI, ItemsContext } from "./context.tsx";
import { useContext, ReactNode, Fragment } from "react";
import { Position } from "./slayer.tsx";
import { indexToPosition, isDice, tee } from "./utils.tsx";

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
    moves: number[],
  ): ItemI[] {
    const reachableIndexes = moves.map((n) => (slayerIndex + n) % 16);
    const reachableItems = reachableIndexes.map(
      (idx) => items.filter((item) => item.indexes.includes(idx))[0],
    );
    return reachableItems;
  }

  function getEventuallyReachableItems(
    items: ItemI[],
    slayerIndex: number,
    moves: number[],
  ): EventuallyReachableItem[] {
    const firstMoveReachableItems = getReachableItems(
      items,
      slayerIndex,
      moves,
    );
    const eventuallyReachableItems = firstMoveReachableItems.map((item, i) => {
      return isDice(item)
        ? [
            getReachableItems(items, slayerIndex + moves[i], [1, 4, 5]),
            getReachableItems(items, slayerIndex + moves[i], [2, 3, 6]),
          ]
        : item;
    });
    return eventuallyReachableItems;
  }

  function computeWeightedAverage(
    items: ItemI[],
    slayerIndex: number,
    moves: number[],
  ): number {
    const eventuallyReachableItems = getEventuallyReachableItems(
      items,
      slayerIndex,
      moves,
    );
    const weightedAvg = eventuallyReachableItems.reduce(
      (sum, item, i) =>
        sum +
        (Array.isArray(item)
          ? Math.max(
              computeWeightedAverage(
                items,
                (slayerIndex + moves[i]) % 16,
                [1, 4, 5],
              ),
              computeWeightedAverage(
                items,
                (slayerIndex + moves[i]) % 16,
                [2, 3, 6],
              ),
            )
          : item.weight) /
          3,
      0,
    );
    return weightedAvg;
  }

  const [items, updateItems] = useContext(ItemsContext);
  const eventuallyReachableItems = getEventuallyReachableItems(
    items,
    slayerIndex,
    moves,
  );
  const weightedAvg = computeWeightedAverage(items, slayerIndex, moves);

  return (
    <div className={diceStyles.calculatorText}>
      {weightedAvg.toFixed(1)}&nbsp;=&nbsp;
      <>{"(1/3)*("}&nbsp;</>
      <DiceCalculatorTextSegment
        eventuallyReachableItems={eventuallyReachableItems}
      />
      <>&nbsp;{")"}</>
    </div>
  );
}

function DiceCalculatorTextSegment({
  eventuallyReachableItems,
}: {
  eventuallyReachableItems: EventuallyReachableItem[];
}) {
  const [items, updateItems] = useContext(ItemsContext);
  const diceItem = items.find((item) => isDice(item)) as ItemI;

  return (
    <>
      {eventuallyReachableItems.map((item, i) => (
        <Fragment key={i}>
          {i === 0 ? "" : <>&nbsp;+&nbsp;</>}
          {Array.isArray(item) ? (
            <Fragment key={Math.random()}>
              <DiceCalculatorItem
                key={diceItem.className}
                item={diceItem}
                displayWeight={false}
              />
              <>{"(1/3)*Max("}&nbsp;</>
              <DiceCalculatorTextSegment
                key={1}
                eventuallyReachableItems={item[0]}
              />
              <>&nbsp;{","}&nbsp;</>
              <DiceCalculatorTextSegment
                key={2}
                eventuallyReachableItems={item[1]}
              />
              <>&nbsp;{")"}</>
            </Fragment>
          ) : (
            <DiceCalculatorItem key={item.className} item={item} />
          )}
        </Fragment>
      ))}
    </>
  );
}

function DiceCalculatorItem({
  item,
  displayWeight = true,
}: {
  item: ItemI;
  displayWeight?: boolean;
}) {
  return (
    <>
      <div
        className={`${iconStyles.blockIcon} ${item.className}`}
        style={{ display: "inline-block" }}
      />
      {displayWeight && item.weight}
    </>
  );
}
