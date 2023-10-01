import styles from "./page.module.scss";

function Countdown() {
  return (
    <div className={styles.countdown}>
      <span>1</span>
      <span>2</span>
      <b>:</b>
      <span>4</span>
      <span>5</span>
      <b>:</b>
      <span>1</span>
      <span>0</span>
      <b>:</b>
      <span>1</span>
      <span>0</span>
    </div>
  );
}

export default Countdown;
