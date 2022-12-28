import { useState, useEffect } from 'react';

export function SudokuNumberBoxFilled(props) {
    return (<div className={props.className}>
        <span>{props.value}</span>
    </div>)
}

export function SudokuNumberBoxInput(props) {
    const { setSelected, setInputNumbers, indexes, indexes: [row, column] } = props;

    const [inputNumber, setInputNumber] = useState(null);

    function keyPress(e) {
        if (e.keyCode > 48 && e.keyCode < 58) setInputNumber(e.key);
        else if (e.key === "Backspace") setInputNumber(0);
    }

    const onFocus = (e) => {
        setSelected(indexes);
        e.target.addEventListener("keydown", keyPress, true);
    }

    const onBlur = (e) => {
        setSelected(null);
        e.target.removeEventListener("keydown", keyPress, true);
    }

    useEffect(() => {
        if (inputNumber === null) return;
        setInputNumbers(inputNumbers => {
            inputNumbers[row][column] = parseInt(inputNumber);
            return [...inputNumbers]
        })
    }, [inputNumber]);

    return (<div className={props.className}>
        <span tabIndex="0" onFocus={onFocus} onBlur={onBlur}>{inputNumber !== 0 && inputNumber}</span>
    </div>)
}