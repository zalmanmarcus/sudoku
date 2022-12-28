import { useEffect, useReducer, useState } from 'react';
import sudoku, { randomIndexes } from '../lib/sudoku';
import { SudokuNumberBoxFilled, SudokuNumberBoxInput } from './SudokuNumberBoxes';

const initialNumbersState = {}

const numbersReducer = (state, action) => {
    const row = action.payload.row?.toString();
    const column = action.payload.column?.toSTring();
    switch (action.type) {
        case "value":
            if (state[row] && state[row][column]) {
                state[row][column].value = action.payload.value;
            }
            return state;
        case "input":
            if (state[row] && state[row][column]) {
                state[row][column].input = action.payload.input;
            }
            return state;
        case "init": {
            const newState = {}
            for (let i = 0; i < action.payload.size; i++) {
                newState[i.toString()] = {}
                for (let j = 0; j < action.payload.size; j++) {
                    newState[i.toString()][j.toString()] = {}
                }
            }
            return newState;
        }
        default:
            return state;
    }
}

export default function SudokuBox() {
    const [sudokuNumbers, setSudokuNumbers] = useState([]);
    const [displayedNumbers, setDisplayedNumbers] = useState();
    const [selected, setSelected] = useState(null);
    const [numbersState, dispatch] = useReducer(numbersReducer, initialNumbersState);

    useEffect(() => {
        sudoku().then(result => {
            setSudokuNumbers(result);
            setDisplayedNumbers(randomIndexes(result, 30));
        });
    }, [])

    useEffect(() => {
        dispatch({ type: "init", payload: { size: sudokuNumbers.length } });
    }, [sudokuNumbers])

    useEffect(() => {
        console.log(numbersState);
        if (!Object.keys(numbersState).length) return;
        for (let row = 0; row < sudokuNumbers.length; row++) {
            for (let column = 0; column < sudokuNumbers.length; column++) {
                dispatch({
                    type: "value",
                    payload: {
                        row: row,
                        column: column,
                        value: sudokuNumbers[row][column]
                    }
                });
            }
        }
    }, [numbersState])

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
                                            dispatchNumber={dispatch}
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