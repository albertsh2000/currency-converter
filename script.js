const firstCurrency = document.getElementById("first")
const secondCurrency = document.getElementById("second")
const convertBtn = document.getElementById("convert-btn")
const result = document.getElementById("result")
const txtFirstCurrency = document.getElementById("txt-first-currency")
const txtSecondCurrency = document.getElementById("txt-second-currency")
const errorMesage = document.getElementById("error-message")

const API_URL = "https://v6.exchangerate-api.com/v6/00df5856aaefc1b3b770c3c0/latest/"

const currenciesFrom = {
   AMD: "Armenian Dram",
   USD: "United States Dollar",
   RUB: "Russian Ruble",
   EUR: "Euro",
   CAD: "Canadian Dollar",
   GEL: "Georgian Lari",
   GBP: "Pound Sterling",
   INR: "Indian Rupee",
   JPN: "Japanese Yen",
}

const currenciesTo = {
   USD: "United States Dollar",
   EUR: "Euro",
   AMD: "Armenian Dram",
   CAD: "Canadian Dollar",
   GEL: "Georgian Lari",
   RUB: "Russian Ruble",
   INR: "Indian Rupee",
   GBP: "Pound Sterling",
   JPN: "Japanese Yen",
}

firstCurrency.innerHTML = getOptions(currenciesFrom)
secondCurrency.innerHTML = getOptions(currenciesTo)

function getOptions(data) {
   return Object.entries(data)
      .map(
         ([country, currency]) =>
            `<option value="${country}">${country} | ${currency}</option>`
      )
      .join("")
}

async function fetchCurrencies(e) {
   e.preventDefault()
   const primary = firstCurrency.value
   const secondary = secondCurrency.value
   const amount = document.getElementById("amount").value

   try {
      const response = await fetch(API_URL + primary)
      const data = await response.json()
      displayFinalResult(data, primary, secondary, amount)
   } catch (error) {
      console.log("fetch error", error)
   }
}

convertBtn.addEventListener("click", fetchCurrencies)

function displayFinalResult(data, primary, secondary, amount) {
   if (Number(amount) !== 0) {
      const calculated = amount * data.conversion_rates[secondary]
      result.classList.remove("hidden")

      txtFirstCurrency.textContent = `${amount} ${primary} =`
      txtSecondCurrency.textContent = `${calculated.toFixed(2)} ${secondary}`
   } else if (Number(amount) === 0) {
      result.classList.remove("hidden")
      txtFirstCurrency.textContent = "Please type amount"
      txtSecondCurrency.textContent = null
   }
}
