import {useState} from "react";
import {RowProps} from "./Row.model";

export const useRow = ({
                         row,
                         rowErrors,
                         colErrors,
                         isSuccess,
                         onNumberPick,
                         rowIndex,
                         insertedNumbers
                       }: RowProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState<number>(-1);

  const closePicker = () => setIsPickerVisible(-1);

  const openPicker = (columnIndex: number) => {
    if (rowErrors.length || colErrors.length || isSuccess) return;

    if (areInsertedNumbersIncludedInRow(rowIndex, columnIndex)) {
      onNumberPick(rowIndex, columnIndex, 0);
    } else setIsPickerVisible(columnIndex);
  };

  const pickNumber = (pickedNumber: number) => {
    onNumberPick(rowIndex, isPickerVisible, pickedNumber);
    closePicker();
  };

  const areInsertedNumbersIncludedInRow = (rowIndex: number, columnIndex: number) =>
    insertedNumbers.length && insertedNumbers.some(row => {
      const [ri, ci] = row;
      return rowIndex === ri && columnIndex === ci;
    });

  const isColumnDisabled = (columnValue: number | null): boolean =>
    isPickerVisible !== -1 || !!columnValue || !!rowErrors.length || !!colErrors.length;

  const getRowClassName = `row ${rowErrors.includes(rowIndex) ? 'error' : ''}`;

  const canOpenPicker = (columnValue: number | null, columnIndex: number) =>
    isPickerVisible !== -1 || !isColumnDisabled(columnValue) || areInsertedNumbersIncludedInRow(rowIndex, columnIndex);

  return {
    row,
    rowErrors,
    colErrors,
    rowIndex,
    isSuccess,
    isPickerVisible,
    getRowClassName,
    canOpenPicker,
    openPicker,
    closePicker,
    pickNumber,
    isColumnDisabled,
    areInsertedNumbersIncludedInRow
  };
};
