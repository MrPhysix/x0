import React from "react";
import styles from "./modal.module.css";
import Button from "../Button/Button";
import xImage from "../../images/x.svg";
import oImage from "../../images/o.svg";

export default function Modal({ isOpen, winner, handleOnReset }) {
  if (!isOpen) return null;

  const displayedImg = (() => {
    switch (winner) {
      case true:
        return (
          <img className={styles.icon} src={xImage} alt="section-symbol" />
        );
      case false:
        return (
          <img className={styles.icon} src={oImage} alt="section-symbol" />
        );
      default:
        return null;
    }
  })();

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <p>
          {winner !== null ? (
            <>
              {displayedImg}
              {`Player ${winner ? "1" : "2"} claims the win! `}
            </>
          ) : (
            "No winners today, just two great players! It's a tie!"
          )}
        </p>
        <Button
          text={"Start Over"}
          handleOnClick={handleOnReset}
          color={"green"}
          isActive={true}
        />
      </div>
    </div>
  );
}
