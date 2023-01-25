import './App.css';
import { useState } from 'react';
import SudokuBox from './components/SudokuBox';
import OnScreenNumbers from './components/OnScreenNumbers';

function App() {
  const [liftedState, liftState] = useState({});
  const [isSolved, setIsSolved] = useState(false);

  return (
    <div className="App">
      <SudokuBox setIsSolved={setIsSolved} liftState={liftState} />
      <OnScreenNumbers setInputNumber={liftedState.setInputNumber} />
      <div>{isSolved && "solved, hooray!"}</div>
    </div>
  );
}

export default App;
