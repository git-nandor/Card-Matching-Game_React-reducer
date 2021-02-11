import React from "react";

export default function generateCard(
  index,
  cardType,
  handleRevealCard,
  foundMatches,
  reveals
) {
  const cardImages = {
    types: {
      1: require("../images/card1.png"),
      2: require("../images/card2.png"),
      3: require("../images/card3.png"),
      4: require("../images/card4.png"),
      5: require("../images/card5.png"),
      6: require("../images/card6.png"),
      7: require("../images/card7.png"),
      8: require("../images/card8.png"),
      9: require("../images/card9.png"),
      10: require("../images/card10.png")
    }
  };

  let cardClasses = ["card"];

  if (foundMatches) {
    cardClasses.push("match");
  } else if (reveals.includes(index)) {
    cardClasses.push("reveal");
  }

  return (
    <div
      id={index}
      key={index}
      className={cardClasses.join(" ")}
      onClick={(event) =>
        foundMatches !== true ? handleRevealCard(event.target.id) : null
      }
    >
      <img src={cardImages.types[cardType]} alt="game card" />
    </div>
  );
}
