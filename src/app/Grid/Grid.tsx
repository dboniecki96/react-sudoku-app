import React                from 'react';
import {useGrid} from "./useGrid";
import Row       from "../Row/Row";
import Header    from "../Header/Header";
import {GridProps, RowType} from "./Grid.model";
import './grid.scss';

const Grid = ({gridData}: GridProps) => {
  const {
    grid, resetGrid, onNumberPick, validateGrid, areSomeErrors, gameOver,
    isSuccess, rowErrors, colErrors, tileErrors, insertedNumbers
  } = useGrid(gridData);

  const getGridContainerClassName =
    `grid-container ${isSuccess ? 'success' : (rowErrors.length || colErrors.length || tileErrors.length) ? 'error' : ''}`

  return !gridData || !gridData.length
    ? <div className='no-grid'>No data for filling the grid, please fill the data</div>
    : (
      <React.Fragment>
        <Header resetGrid={resetGrid}
                validateGrid={validateGrid}
                areSomeErrors={areSomeErrors}
                gameOver={gameOver}
                isSuccess={isSuccess}
        />
        <div className={getGridContainerClassName}>
          {
            grid.map((row: RowType, rowIndex: number) =>
              <Row key={rowIndex}
                   rowIndex={rowIndex}
                   row={row}
                   rowErrors={rowErrors}
                   colErrors={colErrors}
                   tileErrors={tileErrors}
                   isSuccess={isSuccess}
                   insertedNumbers={insertedNumbers}
                   onNumberPick={onNumberPick}
              />)
          }
        </div>
        <div className="footer">Dominik Boniecki, 2021</div>
      </React.Fragment>
    );
};

export default Grid;
