let puzzleState = Array.from({length: 16}, (_, i) => i);
const solvedState = [...puzzleState.slice(1), 0];

function createPuzzle() {
    const container = document.getElementById('puzzle');
    container.innerHTML = '';
    
    puzzleState.forEach((num, index) => {
        const tile = document.createElement('div');
        tile.className = `tile ${num === 0 ? 'empty' : ''}`;
        tile.textContent = num || '';
        tile.draggable = num !== 0;
        tile.ondragstart = dragStart;
        tile.ondragover = dragOver;
        tile.ondrop = drop;
        container.appendChild(tile);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedNumber = parseInt(e.dataTransfer.getData('text/plain'));
    const emptyIndex = puzzleState.indexOf(0);
    const draggedIndex = puzzleState.indexOf(draggedNumber);

    if (isValidMove(draggedIndex, emptyIndex)) {
        swapTiles(draggedIndex, emptyIndex);
        checkWinCondition();
    }
}

function isValidMove(from, to) {
    const diff = Math.abs(from - to);
    return diff === 1 || diff === 4;
}

function swapTiles(a, b) {
    [puzzleState[a], puzzleState[b]] = [puzzleState[b], puzzleState[a]];
    createPuzzle();
}

function countInversions(arr) {
    let inversions = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j] && arr[i] !== 0 && arr[j] !== 0) inversions++;
        }
    }
    return inversions;
}

function isSolvable(state) {
    const inversions = countInversions(state.filter(num => num !== 0));
    const emptyRow = 4 - Math.floor(state.indexOf(0) / 4);
    return (inversions + emptyRow) % 2 === 1;
}

function shufflePuzzle() {
    do {
        puzzleState = [...solvedState]
            .sort(() => Math.random() - 0.5)
            .map(num => num === 15 ? 0 : num + 1);
    } while (!isSolvable(puzzleState));
    
    createPuzzle();
    showMessage('¡Puzzle mezclado! Intenta resolverlo', 'success');
}

function checkSolution() {
    if (puzzleState.every((num, i) => num === solvedState[i])) {
        showMessage('¡Felicidades! Puzzle resuelto correctamente 🎉', 'success');
    } else {
        showMessage('La solución aún no es correcta. ¡Sigue intentando! ❌', 'error');
    }
}

function checkWinCondition() {
    if (puzzleState.every((num, i) => num === solvedState[i])) {
        showMessage('¡Lo lograste! 🏆', 'success');
    }
}

function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.className = `message ${type}`;
    msg.textContent = text;
}

// Inicialización
shufflePuzzle();