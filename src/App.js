import './App.css';
import { useState } from 'react';
import SudokuBox from './components/SudokuBox';
import OnScreenNumbers from './components/OnScreenNumbers';
import Menu from './components/Menu';

function App() {
  const [liftedState, liftState] = useState({});
  const [isSolved, setIsSolved] = useState(false);
  const [level, setLevel] = useState(null);

  return (
    <div className="App">
      {level ?
          <>
            <SudokuBox level={level} setIsSolved={setIsSolved} liftState={liftState} />
            <OnScreenNumbers setInputNumber={liftedState.setInputNumber} />
            <div>{isSolved && "solved, hooray!"}</div>
          </>
          :
          <Menu setLevel={setLevel} />
      }
    </div>
  );
}

export default App;
