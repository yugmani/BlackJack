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
  var age = Math.abs(new Date() - new Date(birthday.replace(/-/g, "/")));
  ageInDays.textContent = Math.floor(age / (1000 * 60 * 60 * 24));
  ageInMonths.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 30));
  ageInYears.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 30 * 12));
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
  let div = document.querySelector("#cats-result");
  newImage.setAttribute("class", "cats-item");

  for (image of images) {
    newImage.src = `${image.url}`;

    // Set a fixed width and height because even though I set the parameter to small, the images
    // were still random sizes.
    newImage.width = "300";
    newImage.height = "300";
  }
  div.appendChild(newImage);
}

generateCats.addEventListener("click", getCats);
