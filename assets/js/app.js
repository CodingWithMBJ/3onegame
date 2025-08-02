const moves = ["rock", "paper", "scissor"];
const icons = {
  rock: "✊",
  paper: "🖐️",
  scissor: "✌️",
};

const playerButtons = {
  rock: document.getElementById("rock"),
  paper: document.getElementById("paper"),
  scissor: document.getElementById("scissor"),
};

const computerMove = document.getElementById("computerMove");
const result = document.getElementById("result");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const resetBtn = document.getElementById("resetBtn");

let wins = 0,
  losses = 0,
  ties = 0,
  rounds = 0;
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const tiesEl = document.getElementById("ties");
const roundsEl = document.getElementById("rounds");

let playerName = prompt("What's your name?");
while (!playerName) {
  playerName = prompt("What's your name?");
}

player.textContent = playerName;
computer.textContent = "Computer";

function playGame(playerChoice) {
  const computerChoice = moves[Math.floor(Math.random() * moves.length)];

  computerMove.innerHTML = "";

  const playerBtn = playerButtons[playerChoice];
  playerBtn.classList.add("playerAction");

  const computerBtn = document.createElement("button");
  const icon = document.createElement("span");
  icon.textContent = icons[computerChoice];
  icon.style.fontSize = "5rem";
  computerBtn.classList.add("computerAction");

  computerBtn.classList.add("computerBtn");
  computerBtn.appendChild(icon);
  computerMove.appendChild(computerBtn);

  setTimeout(() => {
    playerBtn.classList.remove("playerAction");
    computerBtn.classList.remove("computerAction");
  }, 1000);

  const outcomes = {
    rock: { rock: "Tie", paper: "Lose", scissor: "Win" },
    paper: { rock: "Win", paper: "Tie", scissor: "Lose" },
    scissor: { rock: "Lose", paper: "Win", scissor: "Tie" },
  };

  const outcome = outcomes[playerChoice][computerChoice];
  const moveName = computerChoice[0].toUpperCase() + computerChoice.slice(1);

  result.textContent =
    outcome === "Tie"
      ? `🤝 Computer chose ${moveName}, It's a tie`
      : outcome === "Win"
      ? `🎉 Computer chose ${moveName}, ${playerName} Wins!`
      : `😢 Computer chose ${moveName}, ${playerName} Loses!`;

  if (outcome === "Win") wins++;
  else if (outcome === "Lose") losses++;
  else ties++;
  rounds++;

  winsEl.textContent = wins;
  lossesEl.textContent = losses;
  tiesEl.textContent = ties;
  roundsEl.textContent = rounds;

  Object.keys(playerButtons).forEach((btn) => {
    if (btn !== playerChoice) playerButtons[btn].style.display = "none";
  });

  setTimeout(() => {
    Object.keys(playerButtons).forEach((btn) => {
      if (btn !== playerChoice)
        playerButtons[btn].style.display = "inline-block";
    });
  }, 3000);
}

Object.keys(playerButtons).forEach((choice) => {
  playerButtons[choice].addEventListener("click", () => playGame(choice));
});

resetBtn.addEventListener("click", () => {
  result.textContent = "";
  computerMove.innerHTML = "";
  wins = 0;
  losses = 0;
  ties = 0;
  rounds = 0;
  winsEl.textContent = "0";
  lossesEl.textContent = "0";
  tiesEl.textContent = "0";
  roundsEl.textContent = "0";
  Object.values(playerButtons).forEach((btn) => {
    btn.style.display = "inline-block";
  });
});
