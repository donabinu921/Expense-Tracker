const baseUrl = "https://v6.exchangerate-api.com/v6/";
const apiKey = "6059e2e91b1d55171f4e1d65";
const inputFields = document.querySelectorAll(".inputField");
const form = document.getElementById("currConverter");
const firstCurrencyInput = document.getElementById("firstCurrency");
const secondCurrencyInput = document.getElementById("secondCurrency");
const amountInput = document.getElementById("amount");
const convertedAmountElement = document.getElementById("convertedAmount");

async function getCurrencyList() {
  const response = await fetch(`${baseUrl}${apiKey}/codes`);
  const data = await response.json();
  const currency = data.supported_codes;
  const firstElements = currency.map(([firstElement]) => firstElement);
  return firstElements;
}

async function populateCurrencyOptions() {
  const currencyList = await getCurrencyList();
  currencyList.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    firstCurrencyInput.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    secondCurrencyInput.appendChild(option2);
  });
}

populateCurrencyOptions();

function convertCurrency(event) {
  event.preventDefault();

  const firstCurrency = firstCurrencyInput.value;
  const secondCurrency = secondCurrencyInput.value;
  const amount = parseFloat(amountInput.value);

  convert(firstCurrency, secondCurrency, amount);
}

async function convert(first, second, amnt) {
  const response = await fetch(
    `${baseUrl}${apiKey}/pair/${first}/${second}/${amnt}`
  );
  const data = await response.json();
  let convertedAmount = data.conversion_result;
  convertedAmountElement.textContent = `${amnt} ${first} = ${convertedAmount} ${second}`;
  firstCurrencyInput.value = "";
  secondCurrencyInput.value = "";
  amountInput.value = "";
}

form.addEventListener("submit", convertCurrency);
