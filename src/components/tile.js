import React from "react";

const Tile = (props) => {
  const { item, position, modify } = props;
  const checked = item.isChecked && position != 12 ? "is-checked" : "";
  const center = position == 12 ? "center" : "";
  return (
    <div
      id={position == 12 ? "balloonsReward" : position}
      onClick={() => modify(position)}
      className={`tile ${checked} ${center}`}
    >
      {JSON.stringify(item.phrase)}
      {position == 12 && <p>&#128512;</p>}
    </div>
  );
};

export default Tile;
