import styles from "./section.module.css";
import xImage from "../../images/x.svg";
import oImage from "../../images/o.svg";

export default function Section({
  number,
  sections,
  setSections,
  player,
  setPlayer,
  isGameOver,
}) {
  const displayedImg = (() => {
    switch (sections[number]) {
      case 1:
        return <img src={xImage} alt="section-symbol" />;
      case 2:
        return <img src={oImage} alt="section-symbol" />;
      default:
        return null;
    }
  })();

  const handleOnClick = (evt) => {
    evt.preventDefault();
    if (sections[number] !== 0) return;

    setSections((prev) => {
      const value = [...prev];
      value[number] = player;
      return value;
    });
    setPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <button
      disabled={!sections[number] === 0 || isGameOver}
      className={`${styles.section} ${
        sections[number] !== 0 ? styles.disabled : ""
      }`}
      onClick={handleOnClick}
    >
      {displayedImg}
    </button>
  );
}
