import styles from "./page.module.scss";

export function Weights() {
  return (
    <div className={styles.weights}>
      <WeightItem className={styles.diamond_x100_5000} />
      <WeightItem className={styles.white_feather_x1} />
      <WeightItem className={styles.purple_feather_x1} />
      <WeightItem className={styles.fire_stone_x1000} />
      <WeightItem className={styles.event_dice_x1} />
      <WeightItem className={styles.earth_stone_x1000} />
      <WeightItem className={styles.white_feather_x1_3} />
      <WeightItem className={styles.wind_stone_x1000} />
      <WeightItem className={styles.emerald_x150} />
      <WeightItem className={styles.green_feather_x1} />
      <WeightItem className={styles.water_stone_x1000} />
      <WeightItem className={styles.emerald_x30_1500} />
      <WeightItem className={styles.diamond_x500} />
    </div>
  );
}

function WeightItem({ className }: { className: string }) {
  return (
    <div className={styles.weightItem}>
      <div className={`${styles.weightIcon} ${className}`} />
      <input
        className={styles.weightInput}
        type="text"
        value={123}
        placeholder="0"
      />
    </div>
  );
}
