import React from "react";
import styles from "./reset-button.module.css";

export default function ResetButton({ handleOnReset }) {
  return (
    <button className={styles.button} onClick={handleOnReset}>
      Replay
    </button>
  );
}
