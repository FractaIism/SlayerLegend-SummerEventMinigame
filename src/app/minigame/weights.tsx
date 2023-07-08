import styles from "./page.module.scss";

export function Weights() {
  return (
    <div className={styles.weights}>
      <div className={`${styles.block} ${styles.diamond_100_5000}`} />
      <input
        className={styles.weightInput}
        name={styles.weightInput}
        type="text"
        value={123}
        placeholder="0"
      />
    </div>
  );
}
