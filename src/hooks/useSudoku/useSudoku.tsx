import {useCallback, useEffect, useState} from "react";
import {
  areAllValuesInsertedInBoard,
  areAllValuesUniqueHorizontally,
  areAllValuesUniqueInTiles,
  areAllValuesUniqueVertically,
  copy2DArray
}                                         from "./sudokuUtils";

export type RowArray = (number | null)[];

export const useSudoku = (gridData: RowArray[]) => {
  const [board, setBoard] = useState<RowArray[]>(copy2DArray(gridData));

  const [insertedNumbersCoordinates, setInsertedNumbersCoordinates] = useState<number[][]>([]);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rowErrors, setRowErrors] = useState<number[]>([]);
  const [colErrors, setColErrors] = useState<number[]>([]);
  const [tileErrors, setTileErrors] = useState<number[]>([]);

  const areSomeErrors: boolean = !!rowErrors.length || !!colErrors.length || !!tileErrors.length;

  const resetErrors = () => {
    setRowErrors([]);
    setColErrors([]);
    setTileErrors([]);
    setIsSuccess(false);
  }

  const resetGrid = () => {
    resetErrors();
    setGameOver(false);
    setInsertedNumbersCoordinates([]);
    setBoard(copy2DArray(gridData));
  };

  const handleRowError = (rowIndex: number) => setRowErrors(rows => [...rows, rowIndex]);
  const handleColError = (colIndex: number) => setColErrors(cols => [...cols, colIndex]);
  const handleTileError = (tileIndex: number) => setTileErrors(tiles => [...tiles, tileIndex]);

  const onNumberPick = (
    rowIndex: number, numberIndex: number, pickedNumber: number
  ) => {
    const boardCopy = copy2DArray(board);
    boardCopy[rowIndex][numberIndex] = pickedNumber;
    setBoard(boardCopy);

    if (pickedNumber) {
      setInsertedNumbersCoordinates(coordinates => [...coordinates, [rowIndex, numberIndex]]);
    } else setInsertedNumbersCoordinates(coordinates => coordinates.filter(item => {
      const [row, col] = item;
      return row !== rowIndex || col !== numberIndex;
    }));
  };

  const validateGrid = useCallback((allValuesInserted: boolean = false) => {
    if (allValuesInserted) setGameOver(true);
    if (areSomeErrors || isSuccess) {
      resetErrors();
      return;
    }

    const horizontallyValid = areAllValuesUniqueHorizontally(board, handleRowError);
    const verticallyValid = areAllValuesUniqueVertically(board, handleColError);
    const isBoardValid = areAllValuesUniqueInTiles(board, handleTileError) && horizontallyValid && verticallyValid;

    if (isBoardValid) setIsSuccess(true);
  }, [board, isSuccess, areSomeErrors]);

  useEffect(() => {
    if (areAllValuesInsertedInBoard(board)) validateGrid(true);
  }, [validateGrid, board]);

  return {
    board,
    onNumberPick,
    resetGrid,
    validateGrid,
    gameOver,
    rowErrors,
    colErrors,
    tileErrors,
    isSuccess,
    areSomeErrors,
    insertedNumbers: insertedNumbersCoordinates
  };
};
