import {GridType}        from "../app/Grid/Grid.model";
import {sampleGrid}      from "../app/App";
import {useValidateGrid} from "../app/Grid/useValidateGrid";

const mockGrid: GridType = sampleGrid;

const modifiedGridForError: GridType = [
  [2, 2, 3, 0, 0, 8, 6, 0, 7],
  [1, 4, 0, 7, 2, 6, 0, 0, 9],
  [5, 0, 7, 1, 3, 9, 4, 2, 8],
  [0, 2, 5, 0, 8, 1, 9, 0, 4],
  [4, 1, 0, 9, 0, 3, 2, 0, 5],
  [0, 7, 9, 2, 0, 5, 0, 3, 6],
  [6, 0, 2, 0, 1, 0, 0, 9, 3],
  [7, 0, 0, 5, 0, 2, 0, 0, 1],
  [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

const errorCallback = jest.fn();

const {
  areValuesUniqueInSingleTile,
  areAllValuesUniqueInTiles,
  areAllValuesUniqueInAllColumns,
  areAllValuesUniqueInAllRows,
  areAllValuesInsertedInGrid
} = useValidateGrid()

describe('=== useValidateGrid ===', () => {
  describe('areValuesUniqueInSingleTile', () => {
    test('should return true if values are unique in single tile', () => {
      expect(areValuesUniqueInSingleTile(mockGrid[0])).toBeTruthy();
    });
    test('should return false if values are not unique in single tile', () => {
      expect(areValuesUniqueInSingleTile(modifiedGridForError[0])).toBeFalsy();
    });
  });
  describe('areAllValuesUniqueInTiles', () => {
    test('should return true if values are unique in all tiles', () => {
      expect(areAllValuesUniqueInTiles(mockGrid, errorCallback)).toBeTruthy();
      expect(errorCallback).not.toHaveBeenCalled();
    });
    test('should return false if values are not unique in single tile', () => {
      expect(areAllValuesUniqueInTiles(modifiedGridForError, errorCallback)).toBeFalsy();
      expect(errorCallback).toHaveBeenCalled();
    });
  });
  describe('areAllValuesUniqueInColumns', () => {
    test('should return true if values are unique in all columns', () => {
      expect(areAllValuesUniqueInAllColumns(mockGrid, errorCallback)).toBeTruthy();
      expect(errorCallback).not.toHaveBeenCalled();
    });
    test('should return false if values are not unique in all columns', () => {
      const modifiedGridWithNonUniqueColumns: GridType = [
        [2, 0, 3, 0, 0, 8, 6, 0, 7],
        [2, 4, 0, 7, 2, 6, 0, 0, 9],
        [2, 0, 7, 1, 3, 9, 4, 2, 8],
        [2, 2, 5, 0, 8, 1, 9, 0, 4],
        [2, 1, 0, 9, 0, 3, 2, 0, 5],
        [2, 7, 9, 2, 0, 5, 0, 3, 6],
        [2, 0, 2, 0, 1, 0, 0, 9, 3],
        [2, 0, 0, 5, 0, 2, 0, 0, 1],
        [2, 8, 1, 3, 6, 7, 0, 4, 0]
      ];
      expect(areAllValuesUniqueInAllColumns(modifiedGridWithNonUniqueColumns, errorCallback)).toBeFalsy();
      expect(errorCallback).toHaveBeenCalled();
    });
  });
  describe('areAllValuesUniqueInRows', () => {
    test('should return true if values are unique in all rows', () => {
      expect(areAllValuesUniqueInAllRows(mockGrid, errorCallback)).toBeTruthy();
      expect(errorCallback).not.toHaveBeenCalled();
    });
    test('should return false if values are not unique in all rows', () => {
      const modifiedGridWithNonUniqueRows: GridType = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 4, 0, 7, 2, 6, 0, 0, 9],
        [5, 0, 7, 1, 3, 9, 4, 2, 8],
        [0, 2, 5, 0, 8, 1, 9, 0, 4],
        [4, 1, 0, 9, 0, 3, 2, 0, 5],
        [0, 7, 9, 2, 0, 5, 0, 3, 6],
        [6, 0, 2, 0, 1, 0, 0, 9, 3],
        [7, 0, 0, 5, 0, 2, 0, 0, 1],
        [0, 8, 1, 3, 6, 7, 0, 4, 0]
      ];
      expect(areAllValuesUniqueInAllRows(modifiedGridWithNonUniqueRows, errorCallback)).toBeFalsy();
      expect(errorCallback).toHaveBeenCalled();
    });
  });
  describe('areAllValuesInsertedInGrid', () => {
    test('should return true if all values are inserted in grid', () => {
      const gridWithAllValuesInserted = [
        [2, 2, 3, 1, 1, 8, 6, 2, 7],
        [1, 4, 3, 7, 2, 6, 2, 2, 9],
        [5, 3, 7, 1, 3, 9, 4, 2, 8],
        [2, 2, 5, 1, 8, 1, 9, 3, 4],
        [4, 1, 2, 9, 1, 3, 2, 3, 5],
        [3, 7, 9, 2, 3, 5, 3, 3, 6],
        [6, 3, 2, 3, 1, 3, 2, 9, 3],
        [7, 3, 3, 5, 2, 2, 2, 3, 1],
        [3, 8, 1, 3, 6, 7, 3, 4, 3]
      ];
      expect(areAllValuesInsertedInGrid(gridWithAllValuesInserted)).toBeTruthy();
    });
    test('should return false if all values are not inserted in grid', () => {
      expect(areAllValuesInsertedInGrid(mockGrid)).toBeFalsy();
    });
  });
});
