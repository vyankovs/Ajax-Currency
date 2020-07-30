const currencyFrom = document.getElementById("currency-one");
const amountFrom = document.getElementById("amount-one");
const currencyTo = document.getElementById("currency-two");
const amountTo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function onlyPositive() {
  if (amountFrom.value < 0) {
    amountFrom.value = 0;
  }
  if (amountTo.value < 0) {
    amountTo.value = 0;
  }
}

function calculate() {
  const currency_one = currencyFrom.value;
  const currency_two = currencyTo.value;
  // if (currency_one == currency_two) {
  //   alert("Currencies cannot match");
  // } else if (amountFrom.value == "") {
  //   alert("Please insert amount you want to convert");
  // } else {
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://api.exchangerate-api.com/v4/latest/${currency_one}`,
    true
  );
  xhr.onload = function () {
    if (this.status == 200) {
      var response = JSON.parse(this.responseText);

      const rate = response.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountTo.value = (amountFrom.value * rate).toFixed(2);
    } else {
      console.log("fail");
    }
  };

  xhr.send();
}

currencyFrom.addEventListener("change", calculate);
amountFrom.addEventListener("input", onlyPositive);
amountFrom.addEventListener("input", calculate);
currencyTo.addEventListener("change", calculate);
amountTo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  calculate();
});

calculate();
