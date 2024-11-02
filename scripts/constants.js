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
