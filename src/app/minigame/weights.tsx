import styles from "./page.module.scss";

export function Weights() {
  return (
    <div className={styles.weights}>
      <WeightRow className={styles.diamond_x100_5000} />
      <WeightRow className={styles.white_feather_x1} />
      <WeightRow className={styles.purple_feather_x1} />
      <WeightRow className={styles.fire_stone_x1000} />
      <WeightRow className={styles.event_dice_x1} />
      <WeightRow className={styles.earth_stone_x1000} />
      <WeightRow className={styles.white_feather_x1_3} />
      <WeightRow className={styles.wind_stone_x1000} />
      <WeightRow className={styles.emerald_x150} />
      <WeightRow className={styles.green_feather_x1} />
      <WeightRow className={styles.water_stone_x1000} />
      <WeightRow className={styles.emerald_x30_1500} />
      <WeightRow className={styles.diamond_x500} />
    </div>
  );
}

function WeightRow({ className }: { className: string }) {
  return (
    <>
      <div className={`${styles.block} ${className}`} />
      <input
        className={styles.weightInput}
        type="text"
        value={123}
        placeholder="0"
      />
    </>
  );
}
