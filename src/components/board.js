import React, { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import Tile from "./tile";
import { data } from "./data";

const Board = () => {
  const winningPositions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 18, 24],
    [4, 8, 16, 20],
  ];

  const [bingoCount, setBingoCount] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const { reward: balloonsReward, isAnimating: isBalloonsAnimating } =
    useReward("balloonsReward", "balloons");

  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const generateData = () => {
    const tempArray = JSON.parse(JSON.stringify(shuffle(data)));
    tempArray.splice(12, 0, { phrase: "Conf call Bingo", isChecked: true });
    return tempArray;
  };

  const [phrases, setPhrases] = useState(() => generateData());

  useEffect(() => {
    let tempBingoCount = 0;
    for (let i = 0; i < winningPositions.length; i++) {
      let result = winningPositions[i].every((val) =>
        selectedTiles.includes(val)
      );
      if (result) tempBingoCount++;
    }
    if (tempBingoCount > bingoCount) balloonsReward();

    setBingoCount(tempBingoCount);
  }, [phrases]);

  const selectItem = (position) => {
    if (position === 12) return;

    const index = selectedTiles.indexOf(position);
    if (index > -1) {
      selectedTiles.splice(index, 1);
    } else selectedTiles.push(position);

    const tempArray = JSON.parse(JSON.stringify(phrases));
    tempArray[position].isChecked = !tempArray[position].isChecked;
    setPhrases(tempArray);
  };

  return (
    <>
      <div className="board">
        {phrases.map((item, index) => (
          <Tile item={item} position={index} modify={selectItem} />
        ))}
      </div>
      <h2 className="bingo-count">Bingo Count: {bingoCount}</h2>
    </>
  );
};

export default Board;
