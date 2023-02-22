/* 
2C =  Two of Clubs (treboles)
2D =  Two of Diamons (diamantes)
2H =  Two of Hearts (corazones)
2S =  Two of Swords (spadas)
*/

const miModulo = (() => {
  "use strict";

  let deck = [];

  const takeCardBtn = document.querySelector("#take-card"),
    stopBtn = document.querySelector("#player-stop"),
    newGameBtn = document.querySelector("#new-game"),
    HTMLPoints = document.querySelectorAll("small");
  const HTMLCardDecks = document.querySelectorAll(".card-deck");
  let puntosJugadores;

  // Initializes game
  const initGame = (playersNumb = 2) => {
    console.clear();
    puntosJugadores = [];
    for (let i = 0; i < playersNumb; i++) {
      puntosJugadores.push(0);
      setEarnedPoints(i, undefined);
      HTMLPoints[i].innerText = puntosJugadores[i];
      HTMLCardDecks[i].innerHTML = "";
    }
    disableBtns(false);
    deck = createDeck();
    console.log("*** New game initialized ****");
  };

  //Creates a new deck
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      appendSymbol(i, deck);
    }

    const letter = ["A", "J", "K", "Q"];
    letter.forEach((letter) => appendSymbol(letter, deck));

    return _.shuffle(deck);
  };

  const appendSymbol = (value, deck) => {
    const symbols = ["C", "D", "H", "S"];
    symbols.forEach((symbol) => deck.push(`${value + symbol}`));
  };

  //User takes a card
  const takeCard = () => {
    if (deck.length === 0)
      throw new Error("There are no more card on card deck");

    //const randomPosition = deck.pop()
    //Double ensures to get a deck random position
    const randomPosition = Math.floor(Math.random() * (deck.length - 1));
    const card = deck[randomPosition];
    //removes taken card from deck
    deck.splice(randomPosition, 1);
    return card;
  };

  //Turn 0 = first player,  last array postion = pc turn
  const setEarnedPoints = (turn, card) => {
    puntosJugadores[turn] =
      card != undefined ? puntosJugadores[turn] + getCardvalue(card) : 0;
    HTMLPoints[turn].innerText = puntosJugadores[turn];
    return puntosJugadores[turn];
  };
  //Computer turn
  const pcTurn = (minPointsRequired) => {
    deck = createDeck();
    let card = "";
    let pcPoints = 0;
    const pcTurn = puntosJugadores.length - 1;

    do {
      card = takeCard();
      pcPoints = setEarnedPoints(pcTurn, card);
      createCardElement(card, pcTurn);

      if (minPointsRequired > 21) break;
    } while (pcPoints <= minPointsRequired && pcPoints <= 21);

    judgeWinner();
  };

  const judgeWinner = () => {
    const [minPointsRequired, pcPoints] = puntosJugadores;
    setTimeout(() => {
      if (minPointsRequired > 21) {
        window.alert("You lose");
      } else if (pcPoints > 21) {
        window.alert("YOU WIN");
      } else if (minPointsRequired === pcPoints) {
        window.alert("TIE!");
      } else if (minPointsRequired < pcPoints && pcPoints <= 21) {
        window.alert("You lose");
      } else if (minPointsRequired > pcPoints && minPointsRequired <= 21) {
        window.alert("YOU WIN");
      }
    }, 100);
  };
  // creates card IMG HTML Element
  const createCardElement = (card, turn) => {
    const cardElement = document.createElement("img");
    cardElement.classList.add("carta");
    cardElement.src = `assets/cartas/${card}.png`;
    HTMLCardDecks[turn].append(cardElement);
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

  takeCardBtn.addEventListener("click", (e) => {
    const card = takeCard();
    const playerPoints = setEarnedPoints(0, card);
    createCardElement(card, 0);

    if (playerPoints > 21) {
      disableBtns(true);
      pcTurn(playerPoints);
    } else if (playerPoints === 21) {
      window.alert("21! YOU WIN");
      disableBtns(true);
      pcTurn(playerPoints);
    }
  });

  stopBtn.addEventListener("click", (e) => {
    disableBtns(true);
    pcTurn(puntosJugadores[0]);
  });

  newGameBtn.addEventListener("click", (e) => initGame());

  return {
    initGame,
  };
})();
