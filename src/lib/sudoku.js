function createNewRandomNumber(excludedNumbers, size = 9) {
    if (excludedNumbers.size > size) throw new Error("No available numbers");
    while (true) {
        const number = Math.floor(Math.random() * 9) + 1;
        if (!excludedNumbers.has(number)) return number;
    }
}

export default function sudoku(size = 9) {
    return new Promise((resolve) => {
        let isContinue = true;
        while (isContinue) {
            try {
                const numberSet = new Array(size);
                for (let i = 0; i < numberSet.length; i++) {
                    numberSet[i] = [...new Array(numberSet.length).fill(0)]
                }
                for (let row = 0; row < numberSet.length; row++) {
                    for (let column = 0; column < numberSet.length; column++) {
                        const excludedNumbers = new Set(numberSet[row]);
                        for (let i = 0; i < numberSet.length; i++) {
                            excludedNumbers.add(numberSet[i][column])
                        }
                        const section = Math.sqrt(size);
                        const sectionHorizontal = Math.floor(column / section) * section;
                        const sectionVertical = Math.floor(row / section) * section;
                        for (let i = sectionVertical; i < sectionVertical + section; i++) {
                            for (let j = sectionHorizontal; j < sectionHorizontal + section; j++) {
                                excludedNumbers.add(numberSet[i][j]);
                            }
                        }
                        const sudokuNumber = createNewRandomNumber(excludedNumbers, size);
                        numberSet[row][column] = sudokuNumber;
                    }
                }
                isContinue = false;
                return resolve(numberSet);
            } catch(err) {}
        }
    })
}

export function randomIndexes(squrArray, numOfValues) {
    const indexes = [];
    let iterations = numOfValues;
    for (let i = 0; i < iterations; i++) {
        const rowIndex = Math.floor(Math.random() * squrArray.length);
        const columnIndex = Math.floor(Math.random() * squrArray[rowIndex].length);
        if (indexes.some(([row, column]) => row === rowIndex && column === columnIndex)) {
            iterations += 1;
        } else {
            indexes.push([rowIndex, columnIndex]);
        }
    }
    return indexes;
}