export const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
export const values = ["Jack", "Queen", "King", "Ace"];
export const cardValues = { Jack: 11, Queen: 12, King: 13, Ace: 14 };
export const relationships = {
  Hearts: "Spades",
  Spades: "Diamonds",
  Diamonds: "Clubs",
  Clubs: "Hearts",
};
export const totalRounds = 5;
export const predefinedDecks = [
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Spades", value: "Ace" },
    { suit: "Hearts", value: "King" },
    { suit: "Clubs", value: "Jack" },
    { suit: "Diamonds", value: "Queen" },
  ],
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Hearts", value: "Ace" },
    { suit: "Spades", value: "Queen" },
    { suit: "Diamonds", value: "King" },
    { suit: "Clubs", value: "Jack" },
  ],
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Diamonds", value: "Ace" },
    { suit: "Clubs", value: "King" },
    { suit: "Hearts", value: "Queen" },
    { suit: "Spades", value: "Jack" },
  ],
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Clubs", value: "Ace" },
    { suit: "Diamonds", value: "King" },
    { suit: "Spades", value: "Queen" },
    { suit: "Hearts", value: "Jack" },
  ],
  [
    { suit: "Joker", value: "Joker" },
    { suit: "Hearts", value: "Ace" },
    { suit: "Spades", value: "King" },
    { suit: "Clubs", value: "Queen" },
    { suit: "Diamonds", value: "Jack" },
  ],
];

export const modeDisplay = document.getElementById("mode");
export const resultDisplay = document.getElementById("result");
export const player1DeckDisplay = document.getElementById("player-1-deck");
export const player2DeckDisplay = document.getElementById("player-2-deck");
export const switchDisplay = document.getElementById("switch");
export const awaitDisplay = document.getElementById("await");
export const p1CardDisplay = document.getElementById("p1-card");
export const p2CardDisplay = document.getElementById("p2-card");
export const finalResultDisplay = document.getElementById("final-result");
export const scoreDisplay = document.getElementById("score");
export const liveScoreDisplay = document.getElementById("liveScore");
