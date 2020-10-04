const selectOptions = document.getElementById("colors");
const userSelected = selectOptions.options[selectOptions.selectedIndex].value;
// console.log(userSelected);
const colorButtons = document.querySelectorAll(".color");
const random = ["pink", "gray", "brown", "orange"];

// console.log(random[randomIndex]);

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * 4);
  for (button of colorButtons) {
    button.style.backgroundColor = random[randomIndex];
  }
}

function colorChange(color) {
  for (button of colorButtons) {
    button.style.backgroundColor = color;
  }
}

selectOptions.addEventListener("change", function () {
  const userSelected = selectOptions.options[selectOptions.selectedIndex].value;
  console.log(userSelected);
  switch (userSelected) {
    case "random":
      randomSelection();
      break;
    case "blue":
      colorChange("blue");
      break;
    case "red":
      colorChange("red");
      break;
    case "reset":
      colorChange("");
      break;
  }
});
