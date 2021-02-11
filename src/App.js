import "./styles.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CardMatchingGame from "./modules/CardMatchingGame/CardMatchingGame";
import GameOptionsContextProvider from "./contexts/GameOptionsContext";
import GamesStart from "./modules/GamesStart";

export default function App() {
  return (
    <div className="App">
      <GameOptionsContextProvider>
        <Switch>
          <Route path="/Card-Matching-Game" component={CardMatchingGame} />
          <Route path="/" exact component={GamesStart} />
        </Switch>
      </GameOptionsContextProvider>
    </div>
  );
}
