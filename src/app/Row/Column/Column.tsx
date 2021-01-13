import React         from "react";
import {ColumnProps} from "./Column.model";
import './column.scss';

const Column = ({
                  columnIndex,
                  columnValue,
                  rowIndex,
                  canOpenPicker,
                  openPicker,
                  rowErrors,
                  colErrors,
                  isSuccess,
                  isColumnDisabled,
                  areInsertedNumbersIncludedInRow
                }: ColumnProps) => {

  const getColumnClassName = (columnValue: number | null, columnIndex: number): string => {
    switch (true) {
      case colErrors.includes(columnIndex) || rowErrors.includes(rowIndex):
        return 'error';
      case isSuccess || (isColumnDisabled(columnValue) && !areInsertedNumbersIncludedInRow(rowIndex, columnIndex)):
        return '';
      case colErrors.length || rowErrors.length || areInsertedNumbersIncludedInRow(rowIndex, columnIndex):
        return 'hover inserted';
      default:
        return 'hover';
    }
  };

  return (
    <div key={columnIndex}
         className={`column ${getColumnClassName(columnValue, columnIndex)}`}
         onClick={() => canOpenPicker(columnValue, columnIndex) && openPicker(columnIndex)}
    >
      <span className={`number ${areInsertedNumbersIncludedInRow(rowIndex, columnIndex) ? 'inserted' : ''}`}>
        {columnValue || ''}
      </span>
    </div>
  );
};

export default Column;
