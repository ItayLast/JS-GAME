import { suits, values, predefinedDecks } from "./constants.js";

export function generateDeck() {
  const randomIndex = Math.floor(Math.random() * predefinedDecks.length);
  return predefinedDecks[randomIndex];
}

export function generatRandomeDeck() {
  let deck = [];
  suits.forEach((suit) =>
    values.forEach((value) => deck.push({ suit, value }))
  );
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

export function displayDeck(deckId, deck, clickHandler) {
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
