import { useState, useEffect } from 'react';

export function SudokuNumberBoxFilled(props) {
    return (<div className={props.className}>
        <span>{props.value}</span>
    </div>)
}

export function SudokuNumberBoxInput(props) {
    const [inputNumber, setInputNumber] = useState(null);

    function keyPress(e) {
        if (e.keyCode > 48 && e.keyCode < 58) setInputNumber(e.key);
        else if (e.key === "Backspace") setInputNumber(null);
    }

    const onFocus = (e) => {
        props.setSelected(props.indexes);
        e.target.addEventListener("keydown", keyPress, true);
    }

    const onBlur = (e) => {
        props.setSelected(null);
        e.target.removeEventListener("keydown", keyPress, true);
    }

    useEffect(() => {
        console.log("setting value of input inn dispatch");
        props.dispatchNumber({
            type: "input",
            payload: {
                row: props.indexes[0],
                column: props.indexes[1],
                input: inputNumber
            }
        });
    }, [inputNumber])

    return (<div className={props.className}>
        <span tabIndex="0" onFocus={onFocus} onBlur={onBlur}>{inputNumber}</span>
    </div>)
}