let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#you-player",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-player",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    K: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

hitSound = new Audio("./blackjack_assets/sounds/swish.m4a");
winSound = new Audio("./blackjack_assets/sounds/cash.mp3");
lossSound = new Audio("./blackjack_assets/sounds/aww.mp3");

const hitButton = document.querySelector("#blackjack-hit");
const standButton = document.querySelector("#blackjack-stand");
const dealerButton = document.querySelector("#blackjack-dealer");

hitButton.addEventListener("click", blackjackHit);
standButton.addEventListener("click", dealerLogic);
dealerButton.addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    const card = randomCard();
    showCard(YOU, card);
    updateScore(YOU, card);
    showScore(YOU);
  }
}

function showCard(activePlayer, card) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `./blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#you-player")
      .querySelectorAll("img");
    // console.log(yourImages);
    for (image of yourImages) {
      image.remove();
    }
    let dealerImages = document
      .querySelector("#dealer-player")
      .querySelectorAll("img");
    // console.log(dealerImages);
    for (image of dealerImages) {
      image.remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector(YOU["scoreSpan"]).style.color = "white";
    document.querySelector(DEALER["scoreSpan"]).style.color = "white";
    document.querySelector("#blackjack-message").textContent = "Let's Play!";
    document.querySelector("#blackjack-message").style.color = "black";
    blackjackGame["turnsOver"] = true;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(activePlayer, card) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(DEALER, card);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  showResult(computeWinner());
}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = "YOU";
      blackjackGame["wins"]++;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = "DEALER";
      blackjackGame["losses"]++;
    } else if (YOU["score"] === DEALER["score"]) {
      winner = "DRAW";
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = "DEALER";
    blackjackGame["losses"]++;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    winner = "DRAW";
    blackjackGame["draws"]++;
  }
  console.log(winner);
  return winner;
}

function showResult(winner) {
  let message = "";
  let messageColor = "";
  if (blackjackGame["turnsOver"] === true) {
    if (winner === "YOU") {
      message = "You Won the Game!";
      messageColor = "green";
      winSound.play();
    } else if (winner === "DEALER") {
      message = "Oops !You Lost!";
      messageColor = "red";
      lossSound.play();
    } else {
      message = "Draw! Play Again!";
      messageColor = "black";
    }
    const messageSpan = document.querySelector("#blackjack-message");
    messageSpan.textContent = message;
    messageSpan.style.color = messageColor;

    document.querySelector("#wins").textContent = blackjackGame["wins"];
    document.querySelector("#losses").textContent = blackjackGame["losses"];
    document.querySelector("#draws").textContent = blackjackGame["draws"];
  }
}
