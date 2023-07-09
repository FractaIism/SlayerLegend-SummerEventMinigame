import styles from "./weights.module.scss";
import iconStyles from './icons.module.scss';
import { useContext, useState } from "react";
import { orderBy } from "lodash";
import { useImmer } from "use-immer";
import { GlobalVariableContext } from "./context";

export function Weights() {
  const [sorted, setSorted] = useState(true);

  return (
    <div className={styles.sortableWeightList}>
      <label className={styles.sortByWeightLabel}>
        <input
          type="checkbox"
          checked={sorted}
          onChange={() => setSorted(!sorted)}
        />
        Sort by weight
      </label>
      <WeightList sorted={sorted} />
    </div>
  );
}

function WeightList({ sorted }: { sorted: boolean }) {
  function updateItemWeight(className: string, newWeight: number) {
    updateItems((draftItems) => {
      const draftItem = draftItems.find((item) => item.className === className);
      if (!draftItem) {
        throw `className ${className} not found`;
      }
      draftItem.weight = newWeight;
    });
  }

  const { blockSize } = useContext(GlobalVariableContext);
  const [items, updateItems] = useImmer([
    { weight: 11, className: iconStyles.diamond_x100_5000 },
    { weight: 58, className: iconStyles.diamond_x500 },
    { weight: 75, className: iconStyles.emerald_x150 },
    { weight: 90, className: iconStyles.emerald_x30_1500 },
    { weight: 23, className: iconStyles.white_feather_x1 },
    { weight: 99, className: iconStyles.white_feather_x1_3 },
    { weight: 45, className: iconStyles.purple_feather_x1 },
    { weight: 14, className: iconStyles.green_feather_x1 },
    { weight: 42, className: iconStyles.wind_stone_x1000 },
    { weight: 87, className: iconStyles.earth_stone_x1000 },
    { weight: 77, className: iconStyles.fire_stone_x1000 },
    { weight: 17, className: iconStyles.water_stone_x1000 },
    { weight: 34, className: iconStyles.event_dice_x1 },
  ]);

  let orderedItems = sorted ? orderBy(items, ["weight"], ["desc"]) : items;

  return (
    <div
      className={styles.weightList}
      style={{
        gridTemplateRows: `repeat(${process.env.NEXT_PUBLIC_WEIGHT_LIST_ROWS}, ${blockSize}px)`,
      }}
    >
      {orderedItems.map(({ className, weight }) => (
        <WeightItem
          key={className}
          className={className}
          weight={weight}
          updateItemWeight={updateItemWeight}
        />
      ))}
    </div>
  );
}

function WeightItem({
  className,
  weight,
  updateItemWeight,
}: {
  className: string;
  weight: number;
  updateItemWeight: (className: string, newWeight: number) => void;
}) {
  return (
    <div className={styles.weightItem}>
      <div className={`${iconStyles.blockIcon} ${className}`} />
      <input
        className={styles.weightInput}
        type="text"
        value={weight}
        placeholder="0"
        onChange={(e) => {
          const floatValue = parseFloat(e.target.value);
          const repairedValue = Number.isNaN(floatValue) ? 0 : floatValue;
          updateItemWeight(className, repairedValue);
        }}
      />
    </div>
  );
}
