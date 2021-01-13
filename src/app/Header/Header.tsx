import React         from "react";
import {HeaderProps} from "./Header.model";
import './header.scss';

const Header = ({
                  resetGrid,
                  gameOver,
                  validateGrid,
                  areSomeErrors,
                  isSuccess
                }: HeaderProps) => {
  return (
    <React.Fragment>
      <div className='header'>
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
    </React.Fragment>
  );
};

export default Header;
