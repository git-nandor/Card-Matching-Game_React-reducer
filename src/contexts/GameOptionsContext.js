import React, { createContext, useReducer } from "react";
import generateCard from "../modules/generateCard";
export const GameOptionsContext = createContext();

const GameOptionsContextProvider = (props) => {
  const createTableData = (tableSize, bestTriesRecords) => {
    const preparedTable = [];
    const preparedMatches = [];

    for (let i = 0; i < parseInt(tableSize, 10); i++) {
      preparedTable.push(i + 1, i + 1);
      preparedMatches.push(false, false);
    }

    const shuffledTable = mixCards(preparedTable);
    const foundMatches = [...preparedMatches];
    const newBestTriesRecords = [...bestTriesRecords];

    if (!bestTriesRecords[tableSize]) {
      newBestTriesRecords[tableSize] = -1;
    }
    return {
      foundMatches,
      bestTriesRecords: newBestTriesRecords,
      tableData: shuffledTable
    };
  };

  const mixCards = (preparedTable) => {
    const shuffledTable = [...preparedTable];

    for (let i = 0; i < shuffledTable.length; i++) {
      const originalPosition = i;
      const newPosition =
        Math.floor((Math.random() * shuffledTable.length) / 2) + 1;
      const card1 = shuffledTable[originalPosition];
      const card2 = shuffledTable[newPosition];

      shuffledTable[originalPosition] = card2;
      shuffledTable[newPosition] = card1;
    }
    return shuffledTable;
  };

  const checkMatches = (reveals, tableData, foundMatches) => {
    let founded = [...foundMatches];
    if (reveals.length === 2) {
      if (tableData[reveals[0]] === tableData[reveals[1]]) {
        founded[reveals[0]] = true;
        founded[reveals[1]] = true;
      }
    }
    return { foundMatches: founded };
  };

  const stepTriesCount = (reveals, triesCount) => {
    let newTriesCount = triesCount;
    if (reveals.length === 2) {
      newTriesCount = triesCount + 1;
    }
    return { triesCount: newTriesCount };
  };

  const handleRevealCard = (id) => {
    if (id !== "" && storedGameData.reveals.length === 2) {
      dispatch({ type: "REVEAL_CARD", revealsId: [parseInt(id, 10)] });
    } else if (
      id !== "" &&
      !storedGameData.reveals.includes(parseInt(id, 10))
    ) {
      dispatch({
        type: "REVEAL_CARD",
        revealsId: [...storedGameData.reveals, parseInt(id, 10)]
      });
    }
  };

  const generateTableDOM = (tableData, reveals, foundMatches) => {
    let newTableDOM = tableData.map((cardType, index) => {
      const card = generateCard(
        index,
        cardType,
        handleRevealCard,
        foundMatches[index],
        reveals
      );
      return card;
    });
    return { table: newTableDOM };
  };

  const checkWin = (
    foundMatches,
    bestTriesRecords,
    tableSize,
    triesCount,
    newRecord,
    win
  ) => {
    let theNewBestTriesRecords = [...bestTriesRecords];
    let winStatus = win;
    let newRecordStatus = newRecord;

    if (!foundMatches.includes(false) && foundMatches.length) {
      winStatus = true;
      if (
        bestTriesRecords[tableSize] === -1 ||
        bestTriesRecords[tableSize] > triesCount
      ) {
        theNewBestTriesRecords[tableSize] = triesCount;
        newRecordStatus = true;
      }
    }
    return {
      win: winStatus,
      newRecord: newRecordStatus,
      bestTriesRecords: theNewBestTriesRecords
    };
  };

  const storedGameDataReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_STATE":
        localStorage.setItem(
          "cardMatchingGameData",
          JSON.stringify({
            tableSize: state.tableSize,
            tableData: state.tableData,
            triesCount: state.triesCount,
            foundMatches: state.foundMatches,
            bestTriesRecords: state.bestTriesRecords
          })
        );
        return state;

      case "START_NEW_GAME":
        return {
          ...state,
          startNewGame: false,
          reveals: [],
          win: false,
          triesCount: 0,
          newRecord: false,
          ...createTableData(state.tableSize, state.bestTriesRecords)
        };

      case "CHECK_MATCHES":
        return {
          ...state,
          ...checkMatches(state.reveals, state.tableData, state.foundMatches)
        };

      case "STEP_TRIES_COUNT":
        return {
          ...state,
          ...stepTriesCount(state.reveals, state.triesCount)
        };

      case "REVEAL_CARD":
        const newReveals = [...action.revealsId];
        return {
          ...state,
          reveals: newReveals
        };

      case "GENERATE_TABLE_DOM":
        return {
          ...state,
          ...generateTableDOM(
            state.tableData,
            state.reveals,
            state.foundMatches
          )
        };

      case "CHECK_WIN":
        return {
          ...state,
          ...checkWin(
            state.foundMatches,
            state.bestTriesRecords,
            state.tableSize,
            state.triesCount,
            state.newRecord,
            state.win
          )
        };

      case "RESTART":
        return { ...state, startNewGame: true };

      case "SET_PREPARED_TABLE_SIZE":
        return { ...state, preparedTableSize: action.size };

      case "PREPARE_START_NEW_GAME":
        return {
          ...state,
          tableSize: state.preparedTableSize,
          startNewGame: true
        };

      default:
        return state;
    }
  };

  const [storedGameData, dispatch] = useReducer(
    storedGameDataReducer,
    {},
    () => {
      const localDataJson = localStorage.getItem("cardMatchingGameData");
      let restoredGameData = {};

      if (localDataJson) {
        restoredGameData = JSON.parse(localDataJson);
      }
      return {
        preparedTableSize: "",
        tableSize: "",
        startNewGame: false,
        tableData: [],
        table: [],
        reveals: [],
        triesCount: 0,
        foundMatches: [],
        bestTriesRecords: [],
        newRecord: true,
        win: false,
        ...restoredGameData
      };
    }
  );

  return (
    <GameOptionsContext.Provider
      value={{
        storedGameData,
        dispatch
      }}
    >
      {props.children}
    </GameOptionsContext.Provider>
  );
};

export default GameOptionsContextProvider;
