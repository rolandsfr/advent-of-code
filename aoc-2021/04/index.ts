import { loadInput } from "../utils/loadInput";

type Board = number[][];
interface InputData {
  numbers: number[];
  boards: Board[]; // array of matrices
}

const getInputData = (): InputData => {
  const rawInput = loadInput(__dirname);
  const numbers = rawInput[0].split(",").map((num) => parseInt(num));

  const retrieveBoards = (
    lineRead: number = 2,
    boards: Board[] = [],
    currentBoard: Board = []
  ): Board[] => {
    if (lineRead == rawInput.length + 1) {
      return boards;
    }

    const currentLine = rawInput[lineRead];

    if (currentBoard.length === 5) {
      return retrieveBoards(lineRead + 1, [...boards, currentBoard], []);
    }

    const currentBoardRowNumbers = currentLine
      .split(" ")
      .filter((num) => !isNaN(parseInt(num)))
      .map((num) => parseInt(num));

    return retrieveBoards(lineRead + 1, boards, [
      ...currentBoard,
      currentBoardRowNumbers,
    ]);
  };

  const boards = retrieveBoards();
  return {
    numbers,
    boards,
  };
};

const input = getInputData();

interface ResultVitals {
  sum: number;
  stoppedAt: number;
}

// PART 1
const getWinningBoardResult = (numbers: number[], boards: Board[]): number => {
  const getWinningBoard = (
    numbersDrawn: number[] = [],
    marked: number[] = [],
    winningBoard: Board | null = null
  ): ResultVitals => {
    if (numbersDrawn.length < 5) {
      return getWinningBoard(
        [...numbersDrawn, numbers[numbersDrawn.length]],
        marked,
        winningBoard
      );
    }

    const sumUnmarked = (board: Board): number => {
      let unmarkedSum = 0;
      let numbersToAvoid = numbersDrawn.slice(0, -1);

      for (let row of board) {
        for (let unit of row) {
          if (!numbersToAvoid.includes(unit)) unmarkedSum += unit;
        }
      }

      return unmarkedSum;
    };

    if (winningBoard?.length) {
      return {
        sum: sumUnmarked(winningBoard),
        stoppedAt: numbersDrawn[numbersDrawn.length - 2],
      };
    }

    let currentMarked: number[] = [],
      localWinningBoard: Board = [];

    boards.forEach((board) => {
      // checking if any row has all of it's numbers marked
      for (let row of board) {
        let markedInRow: number[] = [];
        for (let i of row) {
          for (let num of numbersDrawn) {
            if (i === num && !markedInRow.includes(num)) {
              markedInRow.push(num);
            }
          }
        }

        if (markedInRow.length === 5) {
          currentMarked = markedInRow;
          localWinningBoard = board;
          return;
        }
      }

      // checking if any column has all of is's numbers marked
      const flattened = board.reduce((accumulated, arr) => [
        ...accumulated,
        ...arr,
      ]);

      for (let col = 0; col < board.length; col++) {
        let markedInColumn: number[] = [];
        for (let i = col; i < flattened.length; i += 5) {
          for (let num of numbersDrawn) {
            if (num == flattened[i] && !markedInColumn.includes(num)) {
              markedInColumn.push(num);
            }
          }
        }

        if (markedInColumn.length === 5) {
          currentMarked = markedInColumn;
          localWinningBoard = board;
          return;
        }
      }
    });

    return getWinningBoard(
      [...numbersDrawn, numbers[numbersDrawn.length - 1]],
      currentMarked,
      localWinningBoard
    );
  };
  const results = getWinningBoard();
  return results.sum * results.stoppedAt;
};

// PART 2
const getLosingBoardResult = (numbers: number[], boards: Board[]): number => {
  const getLosingBoard = (
    numbersDrawn: number[] = [],
    marked: number[] = [],
    winningBoards: Board[] = [],
    lastNumberToDraw: number = 0
  ): ResultVitals => {
    if (numbersDrawn.length < 5) {
      return getLosingBoard(
        [...numbersDrawn, numbers[numbersDrawn.length]],
        marked,
        winningBoards,
        numbersDrawn[numbersDrawn.length]
      );
    }

    const sumUnmarked = (board: Board): number => {
      let unmarkedSum = 0;
      let numbersToAvoid = numbersDrawn.slice(0, -1);

      for (let row of board) {
        for (let unit of row) {
          if (!numbersToAvoid.includes(unit)) unmarkedSum += unit;
        }
      }

      return unmarkedSum;
    };

    if (numbersDrawn.length === numbers.length) {
      console.log(winningBoards);
      return {
        sum: 0,
        stoppedAt: lastNumberToDraw,
      };
    }

    console.log(lastNumberToDraw);

    let currentMarked: number[] = [],
      localWinningBoards: Board[] = winningBoards,
      localLastDrawnNumber = lastNumberToDraw;

    winningBoards.forEach((board) => {
      // checking if any row has all of it's numbers marked
      for (let row of board) {
        let markedInRow: number[] = [];
        for (let i of row) {
          for (let num of numbersDrawn) {
            if (i === num && !markedInRow.includes(num)) {
              markedInRow.push(num);
            }
          }
        }

        if (markedInRow.length === 5) {
          currentMarked = markedInRow;
          localWinningBoards.push(board);
          localLastDrawnNumber = numbersDrawn[numbersDrawn.length - 1];
          console.table(board);
        }
      }

      // checking if any column has all of is's numbers marked
      const flattened = board.reduce((accumulated, arr) => [
        ...accumulated,
        ...arr,
      ]);

      for (let col = 0; col < board.length; col++) {
        let markedInColumn: number[] = [];
        for (let i = col; i < flattened.length; i += 5) {
          for (let num of numbersDrawn) {
            if (num == flattened[i] && !markedInColumn.includes(num)) {
              markedInColumn.push(num);
            }
          }
        }

        if (markedInColumn.length === 5) {
          currentMarked = markedInColumn;
          localWinningBoards.push(board);
          localLastDrawnNumber = numbersDrawn[numbersDrawn.length - 1];
          console.table(board);
          //
        }
      }
    });

    return getLosingBoard(
      [...numbersDrawn, numbers[numbersDrawn.length - 1]],
      currentMarked,
      localWinningBoards,
      localLastDrawnNumber
    );
  };
  const results = getLosingBoard();
  console.log(results);
  return results.sum * results.stoppedAt;
};

getLosingBoardResult(input.numbers, input.boards);

export { getWinningBoardResult, getLosingBoardResult };
