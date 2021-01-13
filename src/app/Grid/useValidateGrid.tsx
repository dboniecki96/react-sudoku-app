import {Column, ColumnArray, GridType, RowType, TileArray} from "./Grid.model";
import {convertGridDependingOnTiles}                       from "../../utils/utils";

export const useValidateGrid = () => {
  const areValuesUniqueInSingleTile = (row: RowType): boolean => {
    const insertedValues = row.filter((col: Column) => col);
    return new Set(insertedValues).size === insertedValues.length;
  };

  const getGridColumn = (grid: GridType, columnIndex: number): ColumnArray => grid.map(row => row[columnIndex]);

  const areAllValuesUniqueInTiles = (grid: GridType, onErrorCallback: (tileIndex: number) => void): boolean => {
    const gridDependingOnTiles = convertGridDependingOnTiles(grid);

    return gridDependingOnTiles.reduce((acc: boolean, row: RowType, index: number) => {
      const isTileValid = areValuesUniqueInSingleTile(row);

      if (!isTileValid) {
        onErrorCallback(index);
      }

      return acc && isTileValid
    }, true);
  }

  const areAllValuesUniqueInAllColumns = (grid: GridType, onErrorCallback: (colIndex: number) => void): boolean =>
    grid.reduce((acc: boolean, row: RowType, index: number) => {
      const singleColumn = getGridColumn(grid, index).filter(item => item);
      const areValuesUniqueInColumn = singleColumn.length === new Set(singleColumn).size;

      if (!areValuesUniqueInColumn) onErrorCallback(index);

      return acc && areValuesUniqueInColumn;
    }, true);

  const areAllValuesUniqueInAllRows = (grid: GridType, onErrorCallback: (rowIndexes: number) => void): boolean =>
    grid.reduce((acc: boolean, row: RowType, index: number) => {
      const rowWithNotNullishValues = row.filter(col => col);
      const areValuesUniqueInSingleRow = rowWithNotNullishValues.length === new Set(rowWithNotNullishValues).size;

      if (!areValuesUniqueInSingleRow) onErrorCallback(index);

      return acc && areValuesUniqueInSingleRow
    }, true);

  const areAllValuesInsertedInTile = (tileArray: TileArray): boolean =>
    tileArray.filter(value => value).length === tileArray.length;

  const areAllValuesInsertedInGrid = (grid: GridType): boolean =>
    grid.reduce((acc: boolean, row: RowType) => acc && areAllValuesInsertedInTile(row), true);

  return {
    areValuesUniqueInSingleTile,
    areAllValuesInsertedInGrid,
    areAllValuesUniqueInTiles,
    areAllValuesUniqueInAllColumns,
    areAllValuesUniqueInAllRows
  };
};
