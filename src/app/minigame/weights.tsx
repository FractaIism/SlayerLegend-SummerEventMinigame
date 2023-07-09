import styles from "./page.module.scss";
import { orderBy } from "lodash";

export function Weights({ sortByWeight }: { sortByWeight: boolean }) {
  let items = [
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
  ];

  if (sortByWeight) {
    items = orderBy(items, ["weight"], ["desc"]);
  }

  return (
    <div className={styles.weights}>
      {items.map(({ className, weight }) => (
        <WeightItem key={className} className={className} weight={weight} />
      ))}
    </div>
  );
}

function WeightItem({
  className,
  weight,
}: {
  className: string;
  weight: number;
}) {
  return (
    <div className={styles.weightItem}>
      <div className={`${styles.weightIcon} ${className}`} />
      <input
        className={styles.weightInput}
        type="text"
        value={weight}
        placeholder="0"
      />
    </div>
  );
}
