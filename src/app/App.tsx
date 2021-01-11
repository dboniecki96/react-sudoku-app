import Grid       from "./Grid/Grid";
import './app.scss';
import {RowArray} from "../hooks/useSudoku/useSudoku";

//Copy your set of digits in sampleGrid two-dimensional array
//Digits are displayed the same as been set in array

const sampleGrid: RowArray[] = [
  [2, 0, 3, 0, 0, 8, 6, 0, 7],
  [1, 4, 0, 7, 2, 6, 0, 0, 9],
  [5, 0, 7, 1, 3, 9, 4, 2, 8],
  [0, 2, 5, 0, 8, 1, 9, 0, 4],
  [4, 1, 0, 9, 0, 3, 2, 0, 5],
  [0, 7, 9, 2, 0, 5, 0, 3, 6],
  [6, 0, 2, 0, 1, 0, 0, 9, 3],
  [7, 0, 0, 5, 0, 2, 0, 0, 1],
  [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

const App = () => {
  return (
    <div className='container'>
      <div className='title'>Sudoku</div>
      <Grid gridData={sampleGrid}/>
    </div>
  );
};

export default App;
