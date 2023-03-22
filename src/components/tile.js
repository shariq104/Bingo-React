import React from "react";

const Tile = (props) => {
  const { item, position, modify } = props;

  // classes for CSS
  const checked = item.isChecked && position !== 12 ? "is-checked" : "";
  const isBingo = item.isBingo || position === 12 ? "is-bingo" : "";
  const center = position === 12 ? "center-tile" : "";

  // Tile rendering
  return (
    <div
      id={position === 12 ? "balloonsReward" : position}
      onClick={() => modify(position)}
      className={`item-tile ${checked} ${center} ${isBingo}`}
    >
      {JSON.stringify(item.phrase)}
      {position === 12 && <p>&#128512;</p>}
    </div>
  );
};

export default Tile;
