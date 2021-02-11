import React from "react";
import GameOptions from "./GameOptions";
import Header from "./Header";

const GamesStart = () => {
  return (
    <>
      <Header />
      <div className="info">
        <h1>Card Matching Game</h1>
        <h2>Flip the cards and try to find all pairs</h2>
      </div>
      <GameOptions />
    </>
  );
};
export default GamesStart;
