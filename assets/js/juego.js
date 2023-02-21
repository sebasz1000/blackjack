/* 
2C =  Two of Clubs (treboles)
2D =  Two of Diamons (diamantes)
2H =  Two of Hearts (corazones)
2S =  Two of Swords (spadas)
*/

let playerDeck = [];

const takeCardBtn = document.querySelector("#take-card");
const stopBtn = document.querySelector("#player-stop");
const newGameBtn = document.querySelector("#new-game");
const playerPointsElement = document.querySelectorAll("small")[0];
const playerDeckElement = document.querySelector("#player-deck");
const pcDeckElement = document.querySelector("#pc-deck");
const pcPointsElement = document.querySelectorAll("small")[1];
let playerPoints = 0;
let pcPoints = 0;

//Creates a new deck
const createDeck = (deck) => {
  for (let i = 2; i <= 10; i++) {
    appendSymbol(i, deck);
  }

  const letter = ["A", "J", "K", "Q"];
  letter.forEach((letter) => appendSymbol(letter, deck));

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

const appendSymbol = (value, deck) => {
  const symbols = ["C", "D", "H", "S"];
  symbols.forEach((symbol) => deck.push(`${value + symbol}`));
};

//User takes a card
const takeCard = (deck) => {
  if (deck.length === 0) throw new Error("There are no more card on card deck");

  //const randomPosition = deck.pop()
  //Double ensures to get a deck random position
  const randomPosition = Math.floor(Math.random() * deck.length);
  const card = deck[randomPosition];
  console.log(`Taken card: ${card}`);

  //remove taken card from deck
  deck.splice(randomPosition, 1);
  return card;
};

//Computer turn
const pcTurn = (minPointsRequired) => {
  const deck = createDeck([]);
  let card = "";
  console.log({ deck });
  do {
    card = takeCard(deck);
    pcPoints = getCardvalue(card) + pcPoints;
    pcPointsElement.innerText = pcPoints;
    pcDeckElement.append(createCardElement(card));

    if (minPointsRequired > 21) break;
  } while (pcPoints <= minPointsRequired && pcPoints <= 21);

  setTimeout(() => {
    if (minPointsRequired > 21) {
      window.alert("You lose");
    } else if (pcPoints > 21) {
      window.alert("YOU WIN");
    } else if (minPointsRequired === pcPoints) {
      window.alert("TIE!");
    } else if (minPointsRequired < pcPoints && pcPoints <= 21) {
      window.alert("You lose");
    } else if (minPointsRequired > pcPoint && minPointsRequired <= 21) {
      window.alert("YOU WIN");
    }
  }, 100);
};

// creates card IMG HTML Element
const createCardElement = (card) => {
  const cardElement = document.createElement("img");
  cardElement.classList.add("carta");
  cardElement.src = `assets/cartas/${card}.png`;
  return cardElement;
};

const getCardvalue = (card) => {
  //const value = card.length > 2 ? card.slice(0, 2) : card[0];
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};

const disableBtns = (BooleanValue = true) => {
  takeCardBtn.disabled = BooleanValue;
  stopBtn.disabled = BooleanValue;
  if (BooleanValue) {
    takeCardBtn.classList.add("btn-disabled");
    stopBtn.classList.add("btn-disabled");
  } else {
    takeCardBtn.classList.remove("btn-disabled");
    stopBtn.classList.remove("btn-disabled");
  }
};

// STARTS!!

playerDeck = createDeck(playerDeck);

takeCardBtn.addEventListener("click", (e) => {
  const card = takeCard(playerDeck);
  playerPoints = getCardvalue(card) + playerPoints;
  playerPointsElement.innerText = playerPoints;
  playerDeckElement.append(createCardElement(card));

  if (playerPoints > 21) {
    disableBtns(true);
    pcTurn(playerPoints);
  } else if (playerPoints === 21) {
    disableBtns(true);
    pcTurn(playerPoints);
  }
});

stopBtn.addEventListener("click", (e) => {
  disableBtns(true);
  pcTurn(playerPoints);
});

newGameBtn.addEventListener("click", (e) => {
  disableBtns(false);
  playerPoints = 0;
  pcPoints = 0;
  pcPointsElement.innerText = playerPoints;
  playerPointsElement.innerText = pcPoints;
  pcDeckElement.innerHTML = "";
  playerDeckElement.innerHTML = "";
  playerDeck = [];
  console.clear();
  playerDeck = createDeck(playerDeck);
});
