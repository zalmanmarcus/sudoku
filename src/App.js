import './App.css';
import { useState } from 'react';
import SudokuBox from './components/SudokuBox';

function App() {
  const [isSolved, setIsSolved] = useState(false);

  return (
    <div className="App">
      <SudokuBox setIsSolved={setIsSolved} />
      <div>{isSolved && "solved, hooray!"}</div>
    </div>
  );
}

export default App;
