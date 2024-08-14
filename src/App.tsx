import React, { useState } from 'react';
import './App.css';

// Square component represents a single square in the tic-tac-toe board
function Square({ value, onClick }: { value: string, onClick: () => void }) {
    return (
        <button className={`square ${value}`} onClick={onClick}>
            {value}
        </button>
    );
}

// Board component represents the tic-tac-toe board
function Board() {
    // State to keep track of the squares on the board
    const [squares, setSquares] = useState(Array(9).fill(null));
    // State to keep track of the next player (X or O)
    const [isXNext, setIsXNext] = useState(true);

    // Function to handle a click on a square
    function handleSquareClick(index: number) {
        const newSquares = squares.slice();
        // If there's a winner or the square is already filled, return early
        if (calculateWinner(newSquares) || newSquares[index]) {
            return;
        }
        // Set the clicked square to 'X' or 'O' based on the current player
        newSquares[index] = isXNext ? 'X' : 'O';
        // Update the state with the new squares and toggle the player
        setSquares(newSquares);
        setIsXNext(!isXNext);
    }

    // Function to render a single square
    function renderSquare(index: number) {
        return (
            <Square
                value={squares[index]}
                onClick={() => handleSquareClick(index)}
            />
        );
    }

    // Determine the winner of the game
    const winner = calculateWinner(squares);
    // Set the status message based on the game state
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

// Function to calculate the winner of the game
function calculateWinner(squares: Array<string | null>) {
    // Possible winning combinations
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // Check each winning combination
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        // If all three squares in a line are the same and not null, return the winner
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    // If no winner, return null
    return null;
}

// App component represents the main application
function App() {
    return (
        <div className="app">
            <h1>TicTacToe Game</h1>
            <Board />
        </div>
    );
}

export default App;
