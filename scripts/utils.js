import { player1Choice, player2Choice, p1Points, p2Points } from "./game.js";
import { cardValues, relationships } from "./constants.js";

export function updateScoreDisplay() {
  document.getElementById("score").textContent = `${p1Points}:${p2Points}`;
}

export function determineWinner(card1, card2) {
  if (card1.suit === "Joker" || card2.suit === "Joker") {
    const winner = Math.random() < 0.5 ? "Player 1" : "Player 2";
    winner === "Player 1" ? p1Points++ : p2Points++;
    return `${winner} wins by coin flip!`;
  } else if (card1.suit === card2.suit) {
    const winner =
      cardValues[card1.value] > cardValues[card2.value]
        ? "Player 1"
        : "Player 2";
    winner === "Player 1" ? p1Points++ : p2Points++;
    return `${winner} wins by value!`;
  } else if (relationships[card1.suit] === card2.suit) {
    p1Points++;
    return "Player 1 wins!";
  } else if (relationships[card2.suit] === card1.suit) {
    p2Points++;
    return "Player 2 wins!";
  } else {
    const winner =
      cardValues[card1.value] > cardValues[card2.value]
        ? "Player 1"
        : "Player 2";
    winner === "Player 1" ? p1Points++ : p2Points++;
    return `${winner} wins by value!`;
  }
}

export function showResult() {
  document.getElementById("result").style.display = "block";
  const p1CardDiv = document.getElementById("p1-card");
  const p2CardDiv = document.getElementById("p2-card");

  p1CardDiv.style.backgroundImage =
    player1Choice.suit === "Joker"
      ? `url('assets/joker.png')`
      : `url('assets/${player1Choice.value}_of_${player1Choice.suit}.png')`;

  p2CardDiv.style.backgroundImage =
    player2Choice.suit === "Joker"
      ? `url('assets/joker.png')`
      : `url('assets/${player2Choice.value}_of_${player2Choice.suit}.png')`;

  const outcome = determineWinner(player1Choice, player2Choice);
  document.getElementById("outcome").textContent = outcome;
  if (currentRound === totalRounds) {
    const winner = p1Points > p2Points ? "Player 1" : "Player 2";
    showFinalResult(winner);
  }
}

function showFinalResult(winner) {
  const finalResultDiv = document.getElementById("final-result");
  finalResultDiv.style.display = "block";
  finalResultDiv.textContent = `${winner} has won overall!`;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.className = "cool-button";
  playAgainButton.style.margin = "20px auto";
  playAgainButton.style.display = "block";

  playAgainButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });

  finalResultDiv.appendChild(playAgainButton);
}
