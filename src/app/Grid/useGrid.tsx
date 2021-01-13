import {useCallback, useEffect, useState} from "react";
import {copy2DArray}                      from "../../utils/utils";
import {GridType}                         from "./Grid.model";
import {useValidateGrid}                  from "./useValidateGrid";

export const useGrid = (gridData: GridType) => {
  const [grid, setGrid] = useState<GridType>(copy2DArray(gridData));

  const [insertedNumbersCoordinates, setInsertedNumbersCoordinates] = useState<number[][]>([]);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rowErrors, setRowErrors] = useState<number[]>([]);
  const [colErrors, setColErrors] = useState<number[]>([]);
  const [tileErrors, setTileErrors] = useState<number[]>([]);

  const {
    areAllValuesInsertedInGrid,
    areAllValuesUniqueInTiles,
    areAllValuesUniqueInAllColumns,
    areAllValuesUniqueInAllRows
  } = useValidateGrid();

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
    setGrid(copy2DArray(gridData));
  };

  const handleRowError = (rowIndex: number) => setRowErrors(rows => [...rows, rowIndex]);
  const handleColError = (colIndex: number) => setColErrors(cols => [...cols, colIndex]);
  const handleTileError = (tileIndex: number) => setTileErrors(tiles => [...tiles, tileIndex]);

  const onNumberPick = (
    rowIndex: number, numberIndex: number, pickedNumber: number
  ) => {
    const gridCopy = copy2DArray(grid);
    gridCopy[rowIndex][numberIndex] = pickedNumber;
    setGrid(gridCopy);

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

    const horizontallyValid = areAllValuesUniqueInAllRows(grid, handleRowError);
    const verticallyValid = areAllValuesUniqueInAllColumns(grid, handleColError);
    const isGridValid = areAllValuesUniqueInTiles(grid, handleTileError) && horizontallyValid && verticallyValid;

    if (isGridValid) setIsSuccess(true);
  }, [grid, isSuccess, areSomeErrors, areAllValuesUniqueInAllColumns, areAllValuesUniqueInAllRows, areAllValuesUniqueInTiles]);

  useEffect(() => {
    if (areAllValuesInsertedInGrid(grid)) validateGrid(true);
  }, [validateGrid, grid, areAllValuesInsertedInGrid]);

  return {
    grid,
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
