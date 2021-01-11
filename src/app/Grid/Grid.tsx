import React                 from 'react';
import {RowArray, useSudoku} from "../../hooks/useSudoku/useSudoku";
import {gridMock}            from "../../hooks/useSudoku/sudokuUtils";
import Row                   from "./Row/Row";
import './grid.scss';

const Grid = () => {
  const {
    board, resetGrid, onNumberPick, validateGrid, areSomeErrors, gameOver,
    isSuccess, rowErrors, colErrors, tileErrors, insertedNumbers
  } = useSudoku(gridMock);

  const gridContainerClassName =
    `grid-container ${isSuccess ? 'success' : (rowErrors.length || colErrors.length || tileErrors.length) ? 'error' : ''}`

  return (
    <React.Fragment>
      <div className='settings'>
        <button className='new-game'
                onClick={resetGrid}
        >New game</button>
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
