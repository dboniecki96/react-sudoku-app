export type GridType = (number | null)[][];
export type RowType = (number | null)[];
export type Column = number | null;

export type ColumnArray = (number | null)[];
export type TileArray = (number | null)[];

export interface GridProps {
  gridData: GridType;
}
