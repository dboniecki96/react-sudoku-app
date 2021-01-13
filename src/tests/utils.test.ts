import {convertGridDependingOnTiles, getTileArrayFromGrid, getTileRowPosition, GRID_SIZE} from "../utils/utils";
import {sampleGrid}                                                                       from "../app/App";
import {GridType}                                                                         from "../app/Grid/Grid.model";

//Pass your 2D array set for testing
const mockGrid: GridType = sampleGrid;

describe('=== Utils ===', () => {
  describe('- getTileIndex', () => {
    test('should return tile row position equal -1 when input index is out of range', () => {
      const inputIndexBelowRange = -1;
      const inputIndexAboveRange = 10;
      expect(getTileRowPosition(inputIndexBelowRange)).toBe(-1);
      expect(getTileRowPosition(inputIndexAboveRange)).toBe(-1);
    });
  });

  describe('- getTileArrayFromGrid', () => {
    test('should return proper tileArray when tileIndex is in range', () => {
      const tileIndex = 0;
      const resultTileArray = [2, 0, 3, 1, 4, 0, 5, 0, 7];
      expect(getTileArrayFromGrid(mockGrid, tileIndex)).toStrictEqual(resultTileArray);
      expect(getTileArrayFromGrid(mockGrid, tileIndex).length).toEqual(GRID_SIZE);
    });
    test('should return empty array when tileIndex is out of range', () => {
      const tileIndexBelowRange = -12;
      const tileIndexAboveRange = -12;
      expect(getTileArrayFromGrid(mockGrid, tileIndexBelowRange)).toStrictEqual([]);
      expect(getTileArrayFromGrid(mockGrid, tileIndexAboveRange)).toStrictEqual([]);
    });
  });

  describe('- convertGridDependingOnTiles', () => {
    const convertedGrid: GridType = [
      [2, 0, 3, 1, 4, 0, 5, 0, 7],
      [0, 0, 8, 7, 2, 6, 1, 3, 9],
      [6, 0, 7, 0, 0, 9, 4, 2, 8],
      [0, 2, 5, 4, 1, 0, 0, 7, 9],
      [0, 8, 1, 9, 0, 3, 2, 0, 5],
      [9, 0, 4, 2, 0, 5, 0, 3, 6],
      [6, 0, 2, 7, 0, 0, 0, 8, 1],
      [0, 1, 0, 5, 0, 2, 3, 6, 7],
      [0, 9, 3, 0, 0, 1, 0, 4, 0]
    ];
    test('should return properly converted grid', () => {
      expect(convertGridDependingOnTiles(mockGrid)).toStrictEqual(convertedGrid);
    });
  });
});
