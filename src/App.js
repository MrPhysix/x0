import { useEffect, useState } from "react";
import Section from "./components/Section/Section";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import "./App.css";
import xImage from "./images/x.svg";
import oImage from "./images/o.svg";

function App() {
  const initialStorage = {
    sections: Array(9).fill(null),
    player: true,
    winner: null,
    isGameOver: false,
    history: [],
    currentMove: 0,
    isHistoryUsed: false,
  };

  const [storage, setStorage] = useState(initialStorage);
  const {
    sections,
    player,
    winner,
    isGameOver,
    history,
    currentMove,
    isHistoryUsed,
  } = storage;

  //
  const iconStyle = {
    width: "35px",
    height: "35px",
  };

  ///
  const updateStorage = (newState) => {
    setStorage((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const checkWinner = (sections) => {
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
        current[0] !== null &&
        current[0] === current[1] &&
        current[1] === current[2]
      ) {
        return current[0];
      }
    }
    return null;
  };

  //handlers

  const onHistoryButtonClick = (moveIndex) => {
    const { playerMoved, sections: newSections } = history[moveIndex];

    updateStorage({
      sections: newSections,
      player: !playerMoved,
      currentMove: moveIndex + 1,
      isHistoryUsed: true,
    });
  };

  const handleOnSectionClick = (number) => {
    if (sections[number] !== null || isGameOver) return;

    const newSections = [...sections];
    newSections[number] = player;

    const newHistory = isHistoryUsed
      ? [
          ...history.slice(0, currentMove),
          { playerMoved: player, sections: newSections },
        ]
      : [...history, { playerMoved: player, sections: newSections }];

    updateStorage({
      sections: newSections,
      player: !player,
      history: newHistory,
      currentMove: currentMove + 1,
      isHistoryUsed: false,
    });
  };

  const handleOnReset = (evt) => {
    evt.preventDefault();
    updateStorage(initialStorage);
  };

  //effects

  useEffect(() => {
    const value = checkWinner(sections);

    if (value !== null) {
      updateStorage({
        winner: value,
        isGameOver: true,
      });
    }
  }, [sections]);

  useEffect(() => {
    if (winner === null && sections.every((value) => value !== null)) {
      updateStorage({ isGameOver: true });
    }
  }, [currentMove, winner, sections]);

  // useEffect(() => {
  //   console.log("Current History updated:", history);
  // }, [history]);
  //
  // useEffect(() => {
  //   console.log("currentMove", currentMove);
  // }, [currentMove]);

  return (
    <div className="App">
      <div className="appOptions">
        <div className="optionsInner">
          <p className="playersTitleRow">
            <img style={iconStyle} src={xImage} alt="section-symbol" />- Player
            1
          </p>
          <p className="playersTitleRow">
            <img style={iconStyle} src={oImage} alt="section-symbol" />- Player
            2
          </p>
        </div>
      </div>
      <div className="appContainer">
        <p className="gameStatus">
          {winner
            ? `Victory goes to Player ${winner}!`
            : `Player ${player ? "1" : "2"}, your turn!`}
        </p>
        {sections &&
          sections.map((item, index) => {
            return (
              <Section
                key={index}
                number={index}
                section={item}
                isGameOver={isGameOver}
                handleOnSectionClick={handleOnSectionClick}
              />
            );
          })}
        <div className="appResetButton">
          <Button
            text={"Let’s Go Again!"}
            handleOnClick={handleOnReset}
            color={"#D81D28"}
            isActive={history.some((item) => item)}
          />
        </div>
      </div>
      <div className="appHistory">
        {history &&
          history.map((item, index) => {
            return (
              <Button
                key={index}
                text={`Back to ${index + 1} move`}
                handleOnClick={(evt) =>
                  evt.preventDefault && onHistoryButtonClick(index)
                }
                color={"green"}
                isActive={true}
              />
            );
          })}
      </div>
      <Modal
        isOpen={isGameOver}
        winner={winner}
        handleOnReset={handleOnReset}
      />
    </div>
  );
}

export default App;
