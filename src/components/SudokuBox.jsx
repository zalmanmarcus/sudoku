import { useEffect, useState } from 'react';
import sudoku, { randomIndexes, compareSudokuArrays } from '../lib/sudoku';
import { SudokuNumberBoxFilled, SudokuNumberBoxInput } from './SudokuNumberBoxes';

export default function SudokuBox(props) {
    const [sudokuNumbers, setSudokuNumbers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [displayedNumbers, setDisplayedNumbers] = useState([]);
    const [inputNumbers, setInputNumbers] = useState([]);
    const [grade, setGrade] = useState(null);
    const [liftedState, liftState] = useState({});

    useEffect(() => {
        sudoku().then(result => {
            setSudokuNumbers(result);
            setDisplayedNumbers(randomIndexes(result, 30));
        });
    }, [])

    useEffect(() => {
        props.liftState(state => {
            return { ...state, setInputNumber: liftedState.setInputNumber }
        })
    }, [liftedState])

    useEffect(() => {
        if (!sudokuNumbers.length) return;
        if (!displayedNumbers.length) return;
        setInputNumbers(inputNumbers => {
            for (let i = 0; i < sudokuNumbers.length; i++) {
                const row = []
                for (let j = 0; j < sudokuNumbers.length; j++) {
                    row.push(0);
                }
                inputNumbers.push(row);
            }
            displayedNumbers.forEach(([row, column]) => {
                inputNumbers[row][column] = sudokuNumbers[row][column];
            })
            return [...inputNumbers]
        })
    }, [sudokuNumbers, displayedNumbers])

    useEffect(() => {
        if (!inputNumbers.length) return;
        compareSudokuArrays(sudokuNumbers, inputNumbers, setGrade);
    }, [inputNumbers]);

    useEffect(() => {
        props.setIsSolved(Boolean(grade));
    }, [grade])

    return (
        <>
            {sudokuNumbers.length ? (
                <div className="sudoku-box-container number-box-border">
                    {sudokuNumbers.map((row, i) => {
                        return (
                            <div key={i} className="number-boxes-container">
                                {row.map((number, j) => {
                                    const indexes = [i, j];
                                    let listOfClasses = "number-box number-box-border";
                                    if (j === 0 || j === 3 || j === 6) listOfClasses += " left-edge";
                                    if (j === 2 || j === 5 || j === 8) listOfClasses += " right-edge";
                                    if (i === 0 || i === 3 || i === 6) listOfClasses += " top-edge";
                                    if (i === 2 || i === 5 || i === 8) listOfClasses += " bottom-edge";
                                    if (selected && selected[0] === i && selected[1] === j) listOfClasses += " selected-number-box";
                                    if (displayedNumbers.some(([row, column]) => row === i && column === j)) {
                                        return <SudokuNumberBoxFilled
                                            key={j}
                                            value={number}
                                            className={listOfClasses}
                                            indexes={indexes}
                                            setSelected={setSelected}
                                        />
                                    } else {
                                        return <SudokuNumberBoxInput
                                            key={j}
                                            className={listOfClasses + " input-box"}
                                            indexes={indexes}
                                            setSelected={setSelected}
                                            setInputNumbers={setInputNumbers}
                                            liftState={liftState}
                                        />
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
            ) : <div>Loading...</div>}
        </>
    )
}