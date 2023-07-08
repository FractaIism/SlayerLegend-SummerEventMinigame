import styles from "./page.module.scss";

export function Weights() {
  return (
    <div className={styles.weights}>
      <div className={`${styles.block} ${styles.diamond_100_5000}`} />
    </div>
  );
}
