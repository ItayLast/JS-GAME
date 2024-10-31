import { generateDeck } from "./deck.js";
import { initializeGame } from "./eventHandlers.js";

export let player1Deck = generateDeck();
export let player2Deck = generateDeck();
export let p1Points = 0;
export let p2Points = 0;
export let currentRound = 0;

export let player1Choice = null;
export let player2Choice = null;

export let totalRounds = 5;
export function startGame() {
  initializeGame();
}

export function resetGame() {
  currentRound = 0;
  p1Points = 0;
  p2Points = 0;
  player1Deck = generateDeck();
  player2Deck = generateDeck();
  initializeGame();
}
