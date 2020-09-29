const inputBirthday = document.querySelector("#birth-date");
const submitAge = document.querySelector(".submit-age");
const ageInDays = document.querySelector("#age-days");
const ageInMonths = document.querySelector("#age-months");
const ageInYears = document.querySelector("#age-years");

function findAge() {
  const today = new Date();
  let birthday = inputBirthday.value;
  var age = Math.abs(new Date() - new Date(birthday.replace(/-/g, "/")));
  ageInDays.textContent = Math.floor(age / (1000 * 60 * 60 * 24));
  ageInMonths.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 30));
  ageInYears.textContent = Math.floor(age / (1000 * 60 * 60 * 24 * 30 * 12));
}

submitAge.addEventListener("click", findAge);
