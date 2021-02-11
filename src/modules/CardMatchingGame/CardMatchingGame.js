import React, { useEffect, useContext } from "react";
import { GameOptionsContext } from "../../contexts/GameOptionsContext";
import Header from "../Header";
import GameOptions from "../GameOptions";
import "./cardMatchingGameStyle.css";

const CardMatchingGame = () => {
  const { storedGameData, dispatch } = useContext(GameOptionsContext);

  useEffect(() => {
    if (storedGameData.startNewGame) {
      dispatch({ type: "START_NEW_GAME" });
    }
  }, [storedGameData.startNewGame]);

  useEffect(() => {
    dispatch({ type: "CHECK_MATCHES" });
    dispatch({ type: "STEP_TRIES_COUNT" });
    dispatch({ type: "GENERATE_TABLE_DOM" });
  }, [storedGameData.reveals]);

  useEffect(() => {
    if (storedGameData.triesCount > 0) {
      dispatch({ type: "SAVE_STATE" });
    }
  }, [storedGameData.triesCount]);

  useEffect(() => {
    dispatch({ type: "GENERATE_TABLE_DOM" });
    dispatch({ type: "CHECK_WIN" });
  }, [storedGameData.tableData, storedGameData.foundMatches]);

  return (
    <div className="matching-game">
      <Header>
        <GameOptions />
      </Header>
      <div className="info">
        <h1>Card Matching Game</h1>
        <h2>Flip the cards and try to find all pairs</h2>
      </div>
      <div className="game-hud">
        <div className="tries-record">
          Best tries record:{" "}
          {storedGameData.bestTriesRecords &&
          storedGameData.bestTriesRecords[storedGameData.tableSize] > 0
            ? storedGameData.bestTriesRecords[storedGameData.tableSize]
            : "0"}
        </div>
        <div className="current-tries">
          Current tries: {storedGameData.triesCount}
        </div>
        <button
          id="button-restart"
          onClick={() => {
            dispatch({ type: "RESTART" });
          }}
        >
          RESTART
        </button>
        <div className="win-status">
          {storedGameData.win ? "!!! WIN !!!" : ""}
        </div>
        <div className="new-record">
          {storedGameData.newRecord ? "NEW RECORD" : ""}
        </div>
      </div>
      <div className="table">{storedGameData.table}</div>
    </div>
  );
};

export default CardMatchingGame;
