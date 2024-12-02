const gameContainer = document.getElementById('game');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winningCombination = [];

// Create the 9 game boxes
function createGameBoxes() {
  for (let i = 0; i < 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.index = i;
    box.addEventListener('click', handleBoxClick);
    gameContainer.appendChild(box);
  }
}

// Handle box click
function handleBoxClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] || !gameActive) return; // Ignore if box is already filled or game is over

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      winningCombination = combination;
      highlightWinningBoxes();
      statusDisplay.textContent = `Congratulations! Player ${gameBoard[a]} wins!`;

      // Trigger confetti
      triggerConfetti();
      return;
    }
  }

  // If no winner and the board is full, it's a draw
  if (!gameBoard.includes('')) {
    gameActive = false;
    statusDisplay.textContent = 'It\'s a draw!';
  }
}

// Highlight the winning boxes
function highlightWinningBoxes() {
  winningCombination.forEach(index => {
    const box = gameContainer.children[index];
    box.classList.add('winning-box');
  });
}

// Trigger confetti effect
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  
  Array.from(gameContainer.children).forEach(box => {
    box.textContent = '';
    box.classList.remove('winning-box');
  });
});

// Initialize game
createGameBoxes();
