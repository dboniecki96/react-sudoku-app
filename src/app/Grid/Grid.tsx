import React                 from 'react';
import {RowArray, useSudoku} from "../../hooks/useSudoku/useSudoku";
import Row                   from "./Row/Row";
import './grid.scss';

interface GridProps {
  gridData: RowArray[];
}

const Grid = ({gridData}: GridProps) => {
  const {
    board, resetGrid, onNumberPick, validateGrid, areSomeErrors, gameOver,
    isSuccess, rowErrors, colErrors, tileErrors, insertedNumbers
  } = useSudoku(gridData);

  const gridContainerClassName =
    `grid-container ${isSuccess ? 'success' : (rowErrors.length || colErrors.length || tileErrors.length) ? 'error' : ''}`

  return !gridData || !gridData.length
    ? <div className='no-grid'>No data for filling the board, please fill the data</div>
    : (
      <React.Fragment>
        <div className='settings'>
          <button className='new-game'
                  onClick={resetGrid}
          >New game
          </button>
          {!gameOver &&
          <button className='validate'
                  onClick={() => validateGrid()}>
            {areSomeErrors || isSuccess ? 'Continue' : 'Validate'}
          </button>
          }
        </div>
        {gameOver && <div className='game-over'>Game Over</div>}
        <div className={gridContainerClassName}>
          {
            board.map((row: RowArray, rowIndex: number) =>
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
