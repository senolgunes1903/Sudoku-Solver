document.addEventListener('DOMContentLoaded', () => {
    createSudokuGrid();
    document.getElementById('solve-button').addEventListener('click', solveSudoku);
    document.getElementById('reset-button').addEventListener('click', resetSudoku);
});

function createSudokuGrid() {
    const container = document.getElementById('grid-container');
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('sudoku-cell');
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^1-9]/g, '');
        });
        container.appendChild(input);
    }
}

function solveSudoku() {
    const sudokuGrid = getSudokuGrid();
    if (solveSudokuHelper(sudokuGrid)) {
        updateSudokuGrid(sudokuGrid);
    } else {
        alert('No solution exists for the given Sudoku.');
    }
}

function getSudokuGrid() {
    const grid = [];
    const inputs = document.querySelectorAll('.sudoku-cell');
    inputs.forEach(input => {
        grid.push(parseInt(input.value) || 0);
    });
    return grid;
}

function updateSudokuGrid(grid) {
    const inputs = document.querySelectorAll('.sudoku-cell');
    inputs.forEach((input, index) => {
        input.value = grid[index];
        input.classList.add('solved');
    });
}

function resetSudoku() {
    const inputs = document.querySelectorAll('.sudoku-cell');
    inputs.forEach(input => {
        if (input.classList.contains('initial')) {
            input.value = input.defaultValue;
            input.classList.remove('solved');
        } else {
            input.value = '';
            input.classList.remove('solved');
        }
    });
}


function solveSudokuHelper(grid) {
    const emptySpot = findEmptySpot(grid);
    if (!emptySpot) {
        return true;
    }

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, col, num)) {
            grid[row * 9 + col] = num;
            if (solveSudokuHelper(grid)) {
                return true;
            }
            grid[row * 9 + col] = 0;
        }
    }
    return false;
}

function findEmptySpot(grid) {
    for (let i = 0; i < 81; i++) {
        if (grid[i] === 0) {
            return [Math.floor(i / 9), i % 9];
        }
    }
    return null;
}

function isValidMove(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i * 9 + j] === num) {
                return false;
            }
        }
    }
    return true;
}
