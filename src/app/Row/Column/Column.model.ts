export interface ColumnProps {
  columnIndex: number;
  columnValue: number | null;
  rowIndex: number;
  rowErrors: number[];
  colErrors: number[];
  isSuccess: boolean;
  isColumnDisabled: (columnValue: number | null) => boolean;
  canOpenPicker: (columnValue: number | null, columnIndex: number) => boolean | 0;
  openPicker: (columnIndex: number) => void;
  areInsertedNumbersIncludedInRow : (rowIndex: number, columnIndex: number) => boolean | 0;
}
