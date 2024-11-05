import {
  cardValues,
  relationships,
  totalRounds,
  modeDisplay,
  resultDisplay,
  player1DeckDisplay,
  player2DeckDisplay,
  switchDisplay,
  awaitDisplay,
  p1CardDisplay,
  p2CardDisplay,
  finalResultDisplay,
  scoreDisplay,
  liveScoreDisplay,
} from "./constants.js";
import { generatRandomeDeck, generateDeck } from "./decks.js";
import { blurIn, blurOut } from "./animations.js";

var Vine = new Audio("../assets/Vine.mp3");
var bruh = new Audio("../assets/Bruh.mp3");
var zikokim = new Audio("../assets/Zik.mp3");
zikokim.currentTime = 44;

let p1Points = 0;
let p2Points = 0;

let currentRound = 0;
let player1Choice = null;
let player2Choice = null;

let gametype = localStorage.getItem("mode") || "normal";
let secondsToSwitch = Number(localStorage.getItem("secondsToSwitch")) || 3;
let timeoutSecs = secondsToSwitch * 1000;

modeDisplay.textContent = gametype.toUpperCase() + " Mode";

export let player1Deck = [];
export let player2Deck = [];

if (gametype == "normal") {
  player1Deck = generateDeck();
  player2Deck = generateDeck();
} else {
  player1Deck = generatRandomeDeck();
  player2Deck = generatRandomeDeck();
}

function toggleBackground() {
  document.body.classList.toggle("alt-background");
}

function initializeGame() {
  displayDeck("deck-p1", player1Deck, handlePlayer1Choice);
  resultDisplay.classList.add("hidden");

  if (currentRound != 0) {
    player1DeckDisplay.classList.remove("hidden");
  }
  updateScoreDisplay();
}

function displayDeck(deckId, deck, clickHandler) {
  const deckDiv = document.getElementById(deckId);
  deckDiv.innerHTML = "";

  deck.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    cardDiv.style.backgroundImage =
      card.suit === "Joker"
        ? `url('../assets/joker.png')`
        : `url('../assets/${card.value}_of_${card.suit}.png')`;

    cardDiv.onclick = () => clickHandler(card, index);
    deckDiv.appendChild(cardDiv);
  });
}

function handlePlayer1Choice(card, index) {
  player1Choice = card;
  player1Deck.splice(index, 1);

  switchDisplay.className = "addFlex";
  awaitDisplay.className = "addFlex";
  awaitDisplay.textContent = `(${secondsToSwitch} seconds)`;
  player1DeckDisplay.classList.add("hidden");
  blurOut();

  setTimeout(() => {
    blurIn();
    awaitDisplay.className = "hidden";
    switchDisplay.className = "hidden";
    setTimeout(() => {
      player2DeckDisplay.classList.remove("hidden");
      displayDeck("deck-p2", player2Deck, handlePlayer2Choice);
    }, 300);
  }, timeoutSecs);
}

function handlePlayer2Choice(card, index) {
  player2Choice = card;
  player2Deck.splice(index, 1);
  player2DeckDisplay.classList.add("hidden");
  const outcome = showResult();
  currentRound++;
  if (currentRound < totalRounds) {
    setTimeout(() => {
      initializeGame();
      updateScoreDisplay();
    }, 3000);
  } else {
    showResult();
  }
}

function showResult() {
  resultDisplay.classList.remove("hidden");

  p1CardDisplay.style.backgroundImage =
    player1Choice.suit === "Joker"
      ? `url('../assets/joker.png')`
      : `url('../assets/${player1Choice.value}_of_${player1Choice.suit}.png')`;

  p2CardDisplay.style.backgroundImage =
    player2Choice.suit === "Joker"
      ? `url('../assets/joker.png')`
      : `url('../assets/${player2Choice.value}_of_${player2Choice.suit}.png')`;

  p1CardDisplay.style.animation = "flyInLeft 1s forwards";
  p2CardDisplay.style.animation = "flyInRight 1s forwards";

  if (currentRound == totalRounds) {
    const winner = p1Points > p2Points ? "Player 1" : "Player 2";
    if (winner == "Player 1") {
      p1Points--;
    } else {
      p2Points--;
    }
    showFinalResult(winner);
  }

  const outcome = determineWinner(player1Choice, player2Choice);
  updateScoreDisplay();

  setTimeout(() => {
    const explosionDiv = document.createElement("div");
    explosionDiv.classList.add("explosion");
    resultDisplay.appendChild(explosionDiv);
    setTimeout(() => {
      explosionDiv.className = "hidden";
      document.getElementById("outcome2").textContent = outcome;
    }, 1000);
    Vine.play();
    setTimeout(() => {
      document.getElementById("outcome").textContent = outcome;
      bruh.play();
    }, 3000);
  }, 0);
  return outcome;
}

function showFinalResult(winner) {
  finalResultDisplay.classList.remove("hidden");
  finalResultDisplay.classList.add("addBlock");

  finalResultDisplay.textContent = ` ${winner} has won overall!`;
  toggleBackground();
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.className = "cool-button";
  zikokim.play();
  playAgainButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });

  finalResultDisplay.appendChild(playAgainButton);
}

function updateScoreDisplay() {
  scoreDisplay.textContent = `${p1Points}:${p2Points}`;
  liveScoreDisplay.textContent = `${p1Points}:${p2Points}`;
}

function addPointsLuck(winner) {
  winner === "Player 1" ? p1Points++ : p2Points++;
  return `${winner} WON BY COINFLIP!`;
}

function addPointsValue(card1, card2) {
  const winner =
    cardValues[card1.value] > cardValues[card2.value] ? "Player 1" : "Player 2";
  winner === "Player 1" ? p1Points++ : p2Points++;
  return `${winner} wins by value!`;
}

function determineWinner(card1, card2) {
  if (card1.suit === "Joker" || card2.suit === "Joker") {
    const winner = Math.random() < 0.5 ? "Player 1" : "Player 2";
    return addPointsLuck(winner);
  } else if (card1.suit === card2.suit) {
    return addPointsValue(card1, card2);
  } else if (relationships[card1.suit] === card2.suit) {
    p1Points += 1;
    return "Player 1 wins!";
  } else if (relationships[card2.suit] === card1.suit) {
    p2Points += 1;
    return "Player 2 wins!";
  } else {
    return addPointsValue(card1, card2);
  }
}

initializeGame();
