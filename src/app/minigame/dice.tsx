import styles from "./dice.module.scss";

export function DiceCalculator() {
  return (
    <>
      <div className={`${styles.diceIcon} ${styles.dice_145}`}></div>
      <div className={`${styles.diceIcon} ${styles.dice_236}`}></div>
    </>
  );
}
