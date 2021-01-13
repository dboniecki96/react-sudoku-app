import {RowType} from "../Grid/Grid.model";

export interface RowProps {
  rowIndex: number;
  row: RowType;
  rowErrors: number[];
  colErrors: number[];
  tileErrors: number[];
  insertedNumbers: number[][];
  isSuccess: boolean;
  onNumberPick: (rowIndex: number, numberIndex: number, numberPicked: number) => void;
}
