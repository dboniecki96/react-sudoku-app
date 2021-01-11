import Grid from "./Grid/Grid";
import './app.scss';

const App = () => {
  return (
    <div className='container'>
      <div className='title'>Sudoku</div>
      <Grid/>
    </div>
  );
};

export default App;
