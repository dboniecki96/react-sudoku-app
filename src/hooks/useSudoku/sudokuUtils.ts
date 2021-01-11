import {RowArray} from "./useSudoku";

export const GRID_SIZE = 9;

export const copy2DArray = (array: any[][]) => array.map(row => [...row]);

const getBoardColumn = (board: RowArray[], index: number): RowArray => board.map(tileArray => tileArray[index]);

const areValuesUniqueInTile = (tileArray: RowArray): boolean => {
  const insertedValues = tileArray.filter(val => val);
  return new Set(insertedValues).size === insertedValues.length;
};

export const areAllValuesUniqueInTiles = (board: RowArray[], onErrorCallback: (tileIndex: number) => void): boolean => {
  const boardByTiles = getBoardByTiles(board);

  return boardByTiles.reduce((acc: boolean, currentArray: RowArray, index: number) => {
    const isTileValid = areValuesUniqueInTile(currentArray);

    if (!isTileValid) {
      onErrorCallback(index);
    }

    return acc && isTileValid
  }, true);
}

export const areAllValuesUniqueVertically = (board: RowArray[], onErrorCallback: (colIndex: number) => void): boolean =>
  board.reduce((acc: boolean, currentArray: RowArray, index: number) => {
    const singleColumn = getBoardColumn(board, index).filter(item => item);
    const areValuesUniqueInColumn = singleColumn.length === new Set(singleColumn).size;

    if (!areValuesUniqueInColumn) onErrorCallback(index);

    return acc && areValuesUniqueInColumn;
  }, true);

export const areAllValuesUniqueHorizontally = (board: RowArray[], onErrorCallback: (rowIndexes: number) => void): boolean =>
  board.reduce((acc: boolean, currentArray: RowArray, index: number) => {
    const rowWithNotNullishValues = currentArray.filter(item => item);
    const areValuesUniqueInSingleRow = rowWithNotNullishValues.length === new Set(rowWithNotNullishValues).size;

    if (!areValuesUniqueInSingleRow) onErrorCallback(index);

    return acc && areValuesUniqueInSingleRow
  }, true);

const areAllValuesInsertedInTile = (tileArray: RowArray): boolean =>
  tileArray.filter(value => value).length === tileArray.length;

export const areAllValuesInsertedInBoard = (board: RowArray[]): boolean =>
  board.reduce((acc: boolean, currentArr: RowArray) => acc && areAllValuesInsertedInTile(currentArr), true);

const getTileIndex = (index: number): number => {
  switch (true) {
    case index <= 2:
      return 0;
    case index > 2 && index < 6:
      return 3;
    case index >= 6:
      return 6;
    default:
      return 0;
  }
}

const getTileArray = (board: RowArray[], tileIndex: number): RowArray => {
  const index = getTileIndex(tileIndex);
  let tile: RowArray = [];
  for (let i = index; i < index + 3; i++) {
    tile = [...tile, ...board[i].slice(tileIndex % 3 * 3, tileIndex % 3 * 3 + 3)];
  }
  return tile;
};

export const getBoardByTiles = (board: RowArray[]): RowArray[] => {
  let resultBoard: RowArray[] = [];
  board.forEach((item: RowArray, index: number) => {
    resultBoard.push(getTileArray(board, index));
  });
  return resultBoard;
};
