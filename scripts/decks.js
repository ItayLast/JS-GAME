import {
  suits,
  values,
  cardValues,
  relationships,
  totalRounds,
  predefinedDecks,
  p1Points,
  p2Points,
  currentRound,
  player1Choice,
  player2Choice,
} from "./constants.js";

export function generateDeck() {
  const randomIndex = Math.floor(Math.random() * predefinedDecks.length);
  return predefinedDecks[randomIndex];
}

export function generatRandomeDeck() {
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

export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
