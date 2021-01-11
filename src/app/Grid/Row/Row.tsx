import React, {useState} from "react";
import {RowArray}        from "../../../hooks/useSudoku/useSudoku";
import Picker            from "../Picker/Picker";
import './row.scss';

interface RowProps {
  rowIndex: number;
  row: RowArray;
  rowErrors: number[];
  colErrors: number[];
  tileErrors: number[];
  insertedNumbers: number[][];
  isSuccess: boolean;
  onNumberPick: (rowIndex: number, numberIndex: number, numberPicked: number) => void;
}

const Row = ({row, rowIndex, rowErrors, colErrors, onNumberPick, insertedNumbers, isSuccess}: RowProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState<number>(-1);

  const closePicker = () => setIsPickerVisible(-1);

  const openPicker = (itemIndex: number) => {
    if (rowErrors.length || colErrors.length || isSuccess) return;

    if (areInsertedNumbersIncludedInRow(rowIndex, itemIndex)) {
      onNumberPick(rowIndex, itemIndex, 0);
    } else setIsPickerVisible(itemIndex);
  };

  const pickNumber = (numberPicked: number) => {
    onNumberPick(rowIndex, isPickerVisible, numberPicked);
    closePicker();
  };

  const areInsertedNumbersIncludedInRow = (rowIndex: number, itemIndex: number) =>
    insertedNumbers.length && insertedNumbers.some(row => {
      const [ri, ci] = row;
      return rowIndex === ri && itemIndex === ci;
    });

  const isItemDisabled = (item: number | null): boolean =>
    isPickerVisible !== -1 || !!item || !!rowErrors.length || !!colErrors.length;

  const getRowClassName = `row ${rowErrors.includes(rowIndex) ? 'error' : ''}`;

  const getRowItemClassName = (item: number | null, index: number): string => {
    switch (true) {
      case colErrors.includes(index) || rowErrors.includes(rowIndex):
        return 'error';
      case isSuccess || (isItemDisabled(item) && !areInsertedNumbersIncludedInRow(rowIndex, index)):
        return '';
      case colErrors.length || rowErrors.length || areInsertedNumbersIncludedInRow(rowIndex, index):
        return 'hover inserted';
      default:
        return 'hover';
    }
  };

  const canOpenPicker = (item: number | null, itemIndex: number) =>
    isPickerVisible !== -1 || !isItemDisabled(item) || areInsertedNumbersIncludedInRow(rowIndex, itemIndex);

  return (
    <div key={rowIndex} className={getRowClassName}>
      {
        row.map((item: number | null, itemIndex: number) =>
          <div key={itemIndex}
               className={`row-item ${getRowItemClassName(item, itemIndex)}`}
               onClick={() => canOpenPicker(item, itemIndex) && openPicker(itemIndex)}
          >
            <span className={`number ${areInsertedNumbersIncludedInRow(rowIndex, itemIndex) ? 'inserted' : ''}`}>
              {item || ''}
            </span>
          </div>
        )
      }
      <Picker isVisible={isPickerVisible !== -1}
              onNumberPick={pickNumber}
              onClosePicker={closePicker}/>
    </div>
  );
};

export default Row;
