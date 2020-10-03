const inputBirthday = document.querySelector("#birth-date");
const submitAge = document.querySelector(".submit-age");
const resetAge = document.querySelector(".reset-age");
const ageInDays = document.querySelector("#age-days");
const ageInMonths = document.querySelector("#age-months");
const ageInYears = document.querySelector("#age-years");
const generateCats = document.querySelector(".gen-cats");

// Function to calculate age in days, months and years.
function findAge() {
  const today = new Date();
  let birthday = inputBirthday.value;
  var age = Math.floor(new Date() - new Date(birthday.replace(/-/g, "/")));
  ageInDays.textContent = Math.floor(age / (1000 * 60 * 60 * 24));
  ageInMonths.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 30));
  ageInYears.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 365));
}

// Event listener to display age
submitAge.addEventListener("click", findAge);

// Reset the input and output fields
resetAge.addEventListener("click", () => {
  inputBirthday.value = "";
  ageInDays.textContent = ".............";
  ageInMonths.textContent = ".............";
  ageInYears.textContent = ".............";
});

function getCats() {
  fetch("https://api.thecatapi.com/v1/images/search?size=small")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      generateCat(data);
      console.log(data);
    });
}

function generateCat(images) {
  let newImage = document.createElement("img");
  let catResult = document.querySelector("#cats-result");
  newImage.setAttribute("class", "cats-item");

  for (image of images) {
    newImage.src = `${image.url}`;

    // Set a fixed width and height because even though I set the parameter to small, the images
    // were still random sizes.
    newImage.width = "300";
    newImage.height = "300";
  }
  catResult.appendChild(newImage);
}

generateCats.addEventListener("click", getCats);
var selected = "";
function randomItem() {
  const items = ["rocks", "papers", "scissors"];
  const index = Math.floor(Math.random() * 3);
  selected = items[index];
  // console.log("computer: " + selected);
  return selected;
}

// ROCK SCISSORS AND PAPERS GAME
let element = "";
let message = "";
const rpsItems = document.querySelectorAll(".rps-item");
const rpsResult = document.querySelector("#rps-result");

for (i = 0; i < rpsItems.length; i++) {
  rpsItems[i].addEventListener("click", function (event) {
    element = event.target;

    for (j = 0; j < rpsItems.length; j++) {
      rpsItems[j].style.boxShadow = "0 0 8px 2px gray";
    }

    // element.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.5)";

    const idItem = element.id;
    // console.log("Your item: " + idItem);

    randomItem();

    if (selected == "rocks" && idItem == "papers") {
      message = `<h1 class="win">You are the Winner!</h1>`;
      element.style.boxShadow = "0 0 8px 2px #008000";
    } else if (selected == "rocks" && idItem == "scissors") {
      message = `<h1 class="fail">Oops ! You lost the Game! Try Again!</h1>`;
      element.style.boxShadow = "0 0 8px 2px red";
    } else if (selected == "papers" && idItem == "rocks") {
      message = `<h1 class="fail">Oops ! You lost the Game! Try Again!</h1>`;
      element.style.boxShadow = "0 0 8px 2px red";
    } else if (selected == "papers" && idItem == "scissors") {
      message = `<h1 class="win">You are the Winner!</h1>`;
      element.style.boxShadow = "0 0 8px 2px #008000";
    } else if (selected == "scissors" && idItem == "rocks") {
      message = `<h1 class="win">You are the Winner!</h1>`;
      element.style.boxShadow = "0 0 8px 2px #008000";
    } else if (selected == "scissors" && idItem == "papers") {
      message = `<h1 class="fail">Oops ! You lost the Game! Try Again!</h1>`;
      element.style.boxShadow = "0 0 8px 2px red";
    } else {
      message = `<h1 class="tie">Tie! Tie! Try Again!</h1>`;
      element.style.boxShadow = "0 0 8px 2px yellow";
    }

    const selectedId = document.getElementById(`${selected}`);
    // console.log("selected id: " + selectedId);
    selectedId.style.boxShadow = "0 0 8px 2px #FF00FF";
    rpsResult.innerHTML = message;
  });
}
