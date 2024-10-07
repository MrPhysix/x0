import { useEffect, useState } from "react";
import Section from "./components/Section/Section";
import Modal from "./components/Modal/Modal";
import ResetButton from "./components/ResetButton/ResetButton";
import "./App.css";
import xImage from "./images/x.svg";
import oImage from "./images/o.svg";

function App() {
  const [sections, setSections] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkWinner = (sections) => {
    console.log("checkWinner start");
    const combinations = [
      [sections[0], sections[1], sections[2]],
      [sections[3], sections[4], sections[5]],
      [sections[6], sections[7], sections[8]],
      [sections[0], sections[3], sections[6]],
      [sections[1], sections[4], sections[7]],
      [sections[2], sections[5], sections[8]],
      [sections[0], sections[4], sections[8]],
      [sections[2], sections[4], sections[6]],
    ];

    for (let i = 0; i < combinations.length; i++) {
      let current = combinations[i];
      if (
        current[0] !== 0 &&
        current[0] === current[1] &&
        current[1] === current[2]
      ) {
        // return player;
        return current[0];
      }
    }
    return null;
  };

  const handleOnReset = (evt) => {
    evt.preventDefault();
    setSections([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setIsGameOver(false);
    setPlayer(1);
    setWinner(null);
  };

  useEffect(() => {
    const value = checkWinner(sections);
    if (value) {
      setWinner(value);
      setIsGameOver(true);
    }
  }, [sections]);

  return (
    <div className="App">
      <div className="appOptions">
        <div>
          <p className="playersTitleRow">
            Player 1: <img src={xImage} alt="section-symbol" />
          </p>
          <p className="playersTitleRow">
            Player 2: <img src={oImage} alt="section-symbol" />
          </p>
        </div>
        {winner
          ? `Victory goes to Player ${winner}!`
          : `Player ${player}, your turn!`}
      </div>

      <div className="appContainer">
        {sections.map((item, index) => {
          return (
            <Section
              key={index}
              number={index}
              sections={sections}
              setSections={setSections}
              player={player}
              setPlayer={setPlayer}
              isGameOver={isGameOver}
            />
          );
        })}
      </div>
      <ResetButton handleOnReset={handleOnReset} />
      <Modal
        isOpen={isGameOver}
        winner={winner}
        handleOnReset={handleOnReset}
      />
    </div>
  );
}

export default App;
