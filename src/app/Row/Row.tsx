import React      from "react";
import Picker     from "../Picker/Picker";
import {useRow}   from "./useRow";
import {RowProps} from "./Row.model";
import Column     from "./Column/Column";
import './row.scss';

const Row = (props: RowProps) => {
  const {
    row, rowIndex, colErrors, rowErrors, isSuccess,
    getRowClassName, isPickerVisible, canOpenPicker, isColumnDisabled,
    openPicker, pickNumber, closePicker, areInsertedNumbersIncludedInRow
  } = useRow(props);

  return (
    <div className={getRowClassName}>
      {
        row.map((columnValue: number | null, columnIndex: number) =>
          <Column key={columnIndex}
                  columnIndex={columnIndex}
                  columnValue={columnValue}
                  rowIndex={rowIndex}
                  colErrors={colErrors}
                  rowErrors={rowErrors}
                  isSuccess={isSuccess}
                  canOpenPicker={canOpenPicker}
                  openPicker={openPicker}
                  isColumnDisabled={isColumnDisabled}
                  areInsertedNumbersIncludedInRow={areInsertedNumbersIncludedInRow}
          />
        )
      }
      <Picker isVisible={isPickerVisible !== -1}
              onNumberPick={pickNumber}
              onClosePicker={closePicker}/>
    </div>
  );
};

export default Row;
