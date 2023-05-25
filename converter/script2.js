const inputFields = document.querySelectorAll(".inputField");

inputFields.forEach(function(inputField) {
  inputField.addEventListener("input", function(event) {
    const userInput = event.target.value;
    event.target.value = userInput.toUpperCase();
  });
});


const form = document.getElementById('currConverter');
const firstCurrencyInput = document.getElementById('firstCurrency');
const secondCurrencyInput = document.getElementById('secondCurrency');
const amountInput = document.getElementById('amount');
const convertedAmountElement = document.getElementById('convertedAmount');

function convertCurrency(event) {
  event.preventDefault();

  const firstCurrency = firstCurrencyInput.value.toUpperCase();
  const secondCurrency = secondCurrencyInput.value.toUpperCase();
  const amount = parseFloat(amountInput.value);

  convert(firstCurrency, secondCurrency, amount);
}

const baseUrl="https://www.amdoren.com/api/currency.php";
const apiKey="feKEHL8W35yR3MfNQM85fm7GR8k29A";

async function convert(first,second,amnt){
    const response=await fetch(`${baseUrl}?api_key=${apiKey}&from=${first}&to=${second}&amount=${amnt}`);
    const data=await response.json();
    let convertedAmount= data.amount;
    convertedAmountElement.textContent = `${amnt} ${first} = ${convertedAmount} ${second}`;
    document.getElementById("firstCurrency").value = "";
    document.getElementById("secondCurrency").value = "";
    document.getElementById("amount").value = "";

}

form.addEventListener('submit', convertCurrency);
