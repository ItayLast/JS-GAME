import {
  suits,
  values,
  cardValues,
  relationships,
  totalRounds,
  predefinedDecks,
} from "./constants.js";

import { blurIn, blurOut } from "./animations.js";

let secondsToSwitch = Number(localStorage.getItem("secondsToSwitch")) || 3;
let timeoutSecs = secondsToSwitch * 1000;
console.log(secondsToSwitch);

let gametype = localStorage.getItem("mode") || "normal";

let player1Deck = [];
let player2Deck = [];

var Vine = new Audio("../assets/Vine.mp3");
var bruh = new Audio("../assets/Bruh.mp3");
var zikokim = new Audio("../assets/Zik.mp3");

zikokim.currentTime = 44;
let p1Points = 0;
let p2Points = 0;

let currentRound = 0;

let player1Choice = null;
let player2Choice = null;

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
  if (currentRound != 0) {
    //THIS IS TO RESTART ROUND
    document.getElementById("result").style.display = "none";
    document.getElementById("player-1-deck").style.display = "flex";
    updateScoreDisplay();
  }
}

function generateDeck() {
  const randomIndex = Math.floor(Math.random() * predefinedDecks.length);
  return predefinedDecks[randomIndex];
}

function generatRandomeDeck() {
  let deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });
  shuffleDeck(deck);
  deck.unshift({ suit: "Joker", value: "Joker" });
  return deck.slice(0, 5);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
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
    deckDiv.appendChild(cardDiv); // displays card by appending
  });
}

//handlers

function handlePlayer1Choice(card, index) {
  player1Choice = card;
  player1Deck.splice(index, 1);

  document.getElementById("player-1-deck").style.display = "none";
  document.getElementById("switch").style.display = "flex";
  document.getElementById("await").style.display = "flex";
  document.getElementById("await").textContent = `(${secondsToSwitch} seconds)`;
  blurOut();

  setTimeout(() => {
    blurIn();
    document.getElementById("await").style.display = "none";
    document.getElementById("switch").style.display = "none";
    setTimeout(() => {
      document.getElementById("player-2-deck").style.display = "flex";
      displayDeck("deck-p2", player2Deck, handlePlayer2Choice);
    }, 300);
  }, timeoutSecs);
}

function handlePlayer2Choice(card, index) {
  player2Choice = card;
  player2Deck.splice(index, 1);
  document.getElementById("player-2-deck").style.display = "none";
  const outcome = showResult();

  currentRound++;

  if (currentRound < totalRounds) {
    setTimeout(() => {
      initializeGame();
    }, 5000);
  } else {
    showResult();
  }
  updateScoreDisplay();
}

function showResult() {
  document.getElementById("result").style.display = "flex";
  const p1CardDiv = document.getElementById("p1-card");
  const p2CardDiv = document.getElementById("p2-card");

  // set background images for result cards
  p1CardDiv.style.backgroundImage =
    player1Choice.suit === "Joker"
      ? `url('../assets/joker.png')`
      : `url('../assets/${player1Choice.value}_of_${player1Choice.suit}.png')`;

  p2CardDiv.style.backgroundImage =
    player2Choice.suit === "Joker"
      ? `url('../assets/joker.png')`
      : `url('../assets/${player2Choice.value}_of_${player2Choice.suit}.png')`;

  // trigger animations on result cards
  p1CardDiv.style.animation = "flyInLeft 1s forwards";
  p2CardDiv.style.animation = "flyInRight 1s forwards";

  if (currentRound == totalRounds) {
    const winner = p1Points > p2Points ? "Player 1" : "Player 2";
    const t = p1Points > p2Points ? p1Points-- : p1Points--;
    showFinalResult(winner);
  }

  setTimeout(() => {
    const explosionDiv = document.createElement("div");
    explosionDiv.classList.add("explosion");
    document.getElementById("result").appendChild(explosionDiv);

    // remove explosion after it plays, then display the outcome with a delay
    setTimeout(() => {
      explosionDiv.style.display = "none"; // Hide explosion

      setTimeout(() => {}, 500); // delay for the outcome after explosion disappears
    }, 1000); // explosion duration
    Vine.play();
    setTimeout(() => {
      document.getElementById("outcome").textContent = outcome;
      document.getElementById("outcome2").textContent = outcome;
      bruh.play();
    }, 3000);
  }, 0); // delay before explosion starts
  const outcome = determineWinner(player1Choice, player2Choice);

  return outcome;
}

function showFinalResult(winner) {
  const finalResultDiv = document.getElementById("final-result");
  finalResultDiv.style.display = "block";
  finalResultDiv.textContent = ` ${winner} has won overall!`;
  toggleBackground();
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.className = "cool-button";
  // add a click event listener to navigate to game.html
  zikokim.play();
  playAgainButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });

  // append the button to the final result div
  finalResultDiv.appendChild(playAgainButton);
}

function updateScoreDisplay() {
  document.getElementById("score").textContent = `${p1Points}:${p2Points}`;
}

function determineWinner(card1, card2) {
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
    p1Points += 1;
    return "Player 1 wins!";
  } else if (relationships[card2.suit] === card1.suit) {
    p2Points += 1;
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

initializeGame();
