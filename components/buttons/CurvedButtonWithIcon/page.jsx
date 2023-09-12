import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./page.module.scss";

function CurvedButtonWithIcon({ type, text, icon }) {
  return (
    <button className={styles.button} type={type}>
      {text}{" "}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
}

export default CurvedButtonWithIcon;
