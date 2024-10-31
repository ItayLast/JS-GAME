import { secondsToSwitch } from "./settings";

const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
const values = ["Jack", "Queen", "King", "Ace"];
const cardValues = { Jack: 11, Queen: 12, King: 13, Ace: 14 };
const relationships = {
  Hearts: "Spades",
  Spades: "Diamonds",
  Diamonds: "Clubs",
  Clubs: "Hearts",
};

let player1Deck = [];
let player2Deck = [];

let player1Choice = null;
let player2Choice = null;

console.log("Game Started");

let gametype = "normal";

let timeoutSecs = secondsToSwitch * 1000;

let p1Points = 0;
let p2Points = 0;

let currentRound = 0;
const totalRounds = 5;

const predefinedDecks = [
  // Aggressor deck
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Spades", value: "Ace" },
    { suit: "Hearts", value: "King" },
    { suit: "Diamonds", value: "Queen" },
    { suit: "Clubs", value: "Jack" },
  ],
  // Balanced Blade deck
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Hearts", value: "Ace" },
    { suit: "Spades", value: "Queen" },
    { suit: "Diamonds", value: "King" },
    { suit: "Clubs", value: "Jack" },
  ],
  // Wildcard deck
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Diamonds", value: "Ace" },
    { suit: "Clubs", value: "King" },
    { suit: "Hearts", value: "Queen" },
    { suit: "Spades", value: "Jack" },
  ],
  //  Defender deck
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Clubs", value: "Ace" },
    { suit: "Diamonds", value: "King" },
    { suit: "Spades", value: "Queen" },
    { suit: "Hearts", value: "Jack" },
  ],
  //  Gambit deck
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Hearts", value: "Ace" },
    { suit: "Spades", value: "King" },
    { suit: "Clubs", value: "Queen" },
    { suit: "Diamonds", value: "Jack" },
  ],
];

if (gametype == "normal") {
  player1Deck = generateDeck();
  player2Deck = generateDeck();
} else {
  player1Deck = generatRandomeDeck();
  player2Deck = generatRandomeDeck();
}

function initializeGame() {
  displayDeck("deck-p1", player1Deck, handlePlayer1Choice);
  updateScoreDisplay();
  if (currentRound != 0) {
    document.getElementById("result").style.display = "none";
    document.getElementById("player-1-deck").style.display = "flex";
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
    deckDiv.appendChild(cardDiv); // displays
  });
}

//handlers

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
    setTimeout(() => {
      initializeGame();
    }, timeoutSecs);
  } else {
    showResult();
  }

  updateScoreDisplay();
}

function showResult() {
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
  if (currentRound == totalRounds) {
    const winner = p1Points > p2Points ? "Player 1" : "Player 2";
    const t = p1Points > p2Points ? p1Points-- : p1Points--;
    showFinalResult(winner);
  }
  return outcome;
}

function showFinalResult(winner) {
  // document.getElementById("result").style.display = "none";
  const finalResultDiv = document.getElementById("final-result");
  finalResultDiv.style.display = "block";
  finalResultDiv.textContent = ` ${winner} has won overall!`;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.className = "cool-button";
  playAgainButton.style.margin = "20px auto";
  playAgainButton.style.display = "block";
  playAgainButton.style.marginTop = "20px"; // add margin to space it from text

  // Add a click event listener to navigate to game.html
  playAgainButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });

  // Append the button to the final result div
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
