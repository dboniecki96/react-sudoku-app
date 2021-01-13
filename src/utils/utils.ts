import {GridType, RowType, TileArray} from "../app/Grid/Grid.model";

export const GRID_SIZE = 9;
const TILES_IN_ROW = 3;

export const copy2DArray = (array: any[][]) => array.map(row => [...row]);

export const getTileRowPosition = (index: number): number => {
  switch (true) {
    case index > -1 && index <= 2:
      return 0;
    case index > 2 && index < 6:
      return 3;
    case index >= 6 && index < 9:
      return 6;
    default:
      return -1;
  }
}

export const getTileArrayFromGrid = (grid: GridType, tileIndex: number): TileArray => {
  if (tileIndex < 0 || tileIndex > 8) return [];
  const index = getTileRowPosition(tileIndex);
  const sliceStart = (tileIndex % TILES_IN_ROW) * TILES_IN_ROW;
  const sliceEnd = (tileIndex % TILES_IN_ROW) * TILES_IN_ROW + TILES_IN_ROW;
  let tile: RowType = [];

  for (let i = index; i < index + TILES_IN_ROW; i++) {
    tile = [...tile, ...grid[i].slice(sliceStart, sliceEnd)];
  }

  return tile;
};

export const convertGridDependingOnTiles = (grid: GridType): GridType => {
  let result: GridType = [];
  grid.forEach((row: RowType, rowIndex: number) => result.push(getTileArrayFromGrid(grid, rowIndex)));
  return result;
};
