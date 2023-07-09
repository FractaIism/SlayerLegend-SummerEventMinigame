import styles from "./page.module.scss";
import { useState } from "react";
import { orderBy } from "lodash";
import { useImmer } from "use-immer";

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

  const [items, updateItems] = useImmer([
    { weight: 11, className: styles.diamond_x100_5000 },
    { weight: 23, className: styles.white_feather_x1 },
    { weight: 45, className: styles.purple_feather_x1 },
    { weight: 77, className: styles.fire_stone_x1000 },
    { weight: 34, className: styles.event_dice_x1 },
    { weight: 87, className: styles.earth_stone_x1000 },
    { weight: 99, className: styles.white_feather_x1_3 },
    { weight: 42, className: styles.wind_stone_x1000 },
    { weight: 75, className: styles.emerald_x150 },
    { weight: 14, className: styles.green_feather_x1 },
    { weight: 17, className: styles.water_stone_x1000 },
    { weight: 90, className: styles.emerald_x30_1500 },
    { weight: 58, className: styles.diamond_x500 },
  ]);

  let orderedItems = sorted ? orderBy(items, ["weight"], ["desc"]) : items;

  return (
    <div className={styles.weightList}>
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
      <div className={`${styles.weightIcon} ${className}`} />
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
