import { useState, useEffect } from 'react';

export function SudokuNumberBoxFilled(props) {
    return (<div className={props.className}>
        <span>{props.value}</span>
    </div>)
}

export function SudokuNumberBoxInput(props) {
    const { setSelected, setInputNumbers, indexes, indexes: [row, column], liftState } = props;

    const [inputNumber, setInputNumber] = useState(null);
    const [hasListener, setHasListener] = useState(false);

    function keyPress(e) {
        if (e.keyCode > 48 && e.keyCode < 58) setInputNumber(e.key);
        else if (e.key === "Backspace") setInputNumber(0);
    }

    const onFocus = (e) => {
        setSelected(indexes);
        liftState(state => {
            return {
                ...state,
                setInputNumber
            }
        })
        if (!hasListener) {
            e.target.addEventListener("keydown", keyPress, true);
            setHasListener(true);
        }
    }

    const onBlur = (e) => {
        if (!(parseInt(e.relatedTarget?.id) > 0 && parseInt(e.relatedTarget?.id) < 10)) {
            setSelected(null);
            e.target.removeEventListener("keydown", keyPress, true);
            setHasListener(false);
        }
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