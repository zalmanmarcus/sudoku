export default function Menu(props) {
    const levels = ["EASY", "MEDIUM", "HARD"]

    const onClick = (e) => {
        props.setLevel(e.target.innerText);
    }

    return (
        <div className="menu">
            {levels.map(level => {
                return <button onClick={onClick}>{level}</button>
            })}
        </div>
    )
}