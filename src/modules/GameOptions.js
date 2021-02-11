import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GameOptionsContext } from "../contexts/GameOptionsContext";

const GameOptions = (props) => {
  const { storedGameData, dispatch } = useContext(GameOptionsContext);
  const history = useHistory();

  const activateStartButton = () => {
    const startButton = document.getElementById("button-start");
    storedGameData.preparedTableSize !== ""
      ? (startButton.disabled = false)
      : (startButton.disabled = true);
  };

  const handleStartGame = () => {
    dispatch({ type: "PREPARE_START_NEW_GAME" });
    history.push("/Card-Matching-Game");
  };

  useEffect(() => {
    activateStartButton();
  }, [storedGameData.preparedTableSize]);

  return (
    <>
      <div className={"game-settings"}>
        <label htmlFor="table-size-select">Select table size: </label>
        <div className="select">
          <select
            id="table-size-select"
            value={storedGameData.preparedTableSize}
            onChange={(e) => {
              dispatch({
                type: "SET_PREPARED_TABLE_SIZE",
                size: e.target.value
              });
            }}
          >
            <option value="">--Choose an option--</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <div className="select_arrow"></div>
        </div>
        <div className="button-container">
          <button id="button-start" onClick={() => handleStartGame()}>
            START NEW GAME
          </button>
        </div>
      </div>
    </>
  );
};
export default GameOptions;
