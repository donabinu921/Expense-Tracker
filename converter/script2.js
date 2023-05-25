const inputFields = document.querySelectorAll(".inputField");

inputFields.forEach(function(inputField) {
  inputField.addEventListener("input", function(event) {
    const userInput = event.target.value;
    event.target.value = userInput.toUpperCase();
  });
});
