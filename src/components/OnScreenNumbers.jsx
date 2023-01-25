export default function OnScreenNumbers(props) {
    const { setInputNumber } = props;
    const numbers = Array(9).fill().map((val, i) => i + 1);

    const clickHandle = (e) => {
        if (setInputNumber) {
            setInputNumber(e.target.id);
        }
    }

    return (
        <div className="on-screen-numbers">
            {numbers.map(num => <span
                onClick={clickHandle}
                id={num}
                key={num}
                tabIndex="0"
            >{num}</span>)}
        </div>
    )
}