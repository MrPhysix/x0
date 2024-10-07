import React from "react";
import styles from "./modal.module.css";
import ResetButton from "../ResetButton/ResetButton";
export default function Modal({ isOpen, winner, handleOnReset }) {
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <p>Player {winner} Win</p>
        <ResetButton handleOnReset={handleOnReset} />
      </div>
    </div>
  );
}
