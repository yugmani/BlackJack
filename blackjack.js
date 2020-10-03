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
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

hitSound = new Audio("./blackjack_assets/sounds/swish.m4a");
dealSound = new Audio("./blackjack_assets/sounds/cash.mp3");
standSound = new Audio("./blackjack_assets/sounds/aww.mp3");

const hitButton = document.querySelector("#blackjack-hit");
const standButton = document.querySelector("#blackjack-stand");
const dealerButton = document.querySelector("#blackjack-dealer");

hitButton.addEventListener("click", blackjackHit);
dealerButton.addEventListener("click", blackjackDeal);

function blackjackHit() {
  const card = randomCard();
  showCard(YOU, card);
  showCard(DEALER, card);
  updateScore(YOU, card);
  updateScore(DEALER, card);
  showScore(YOU);
  showScore(DEALER);
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
  DEALER["dealer"] = 0;
  document.querySelector("#your-blackjack-result").textContent = 0;
  document.querySelector("#dealer-blackjack-result").textContent = 0;
  document.querySelector(YOU["scoreSpan"]).style.color = "white";
  document.querySelector(DEALER["scoreSpan"]).style.color = "white";
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
