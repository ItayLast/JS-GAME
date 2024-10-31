import { player1Deck, player2Deck, currentRound, totalRounds } from "./game.js";
import { displayDeck } from "./deck.js";
import { updateScoreDisplay, showResult } from "./utils.js";
import { timeoutSecs } from "./constants.js";

export let player1Choice = null;
export let player2Choice = null;

export function initializeGame() {
  displayDeck("deck-p1", player1Deck, handlePlayer1Choice);
  updateScoreDisplay();
  if (currentRound != 0) {
    document.getElementById("result").style.display = "none";
    document.getElementById("player-1-deck").style.display = "flex";
  }
}

function handlePlayer1Choice(card, index) {
  player1Choice = card;
  player1Deck.splice(index, 1);
  document.getElementById("player-1-deck").style.display = "none";
  setTimeout(() => {
    document.getElementById("player-2-deck").style.display = "flex";
    displayDeck("deck-p2", player2Deck, handlePlayer2Choice);
  }, timeoutSecs);
}

function handlePlayer2Choice(card, index) {
  player2Choice = card;
  player2Deck.splice(index, 1);
  document.getElementById("player-2-deck").style.display = "none";
  const outcome = showResult();
  currentRound++;
  if (currentRound < totalRounds) {
    setTimeout(() => initializeGame(), timeoutSecs);
  }
  updateScoreDisplay();
}
