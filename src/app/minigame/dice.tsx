import { divide } from "lodash";
import styles from "./dice.module.scss";

export function DiceCalculator() {
  return (
    <>
      <div className={`${styles.diceIcon} ${styles.dice_145}`}></div>
      <DiceCalculatorText moves={[1, 4, 5]} />
      <div className={`${styles.diceIcon} ${styles.dice_236}`}></div>
    </>
  );
}

function DiceCalculatorText({ moves }: { moves: number[] }) {
  return <div>123</div>;
}
