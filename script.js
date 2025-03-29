function calculateSines() {
   const dropdown = document.querySelector("#sinesCalculator #dropdown")
   const resultElement = document.querySelector("#sinesCalculator .result")
   const infoElement = document.querySelector("#sinesCalculator .info")
   const sideAInput = document.querySelector("#sinesCalculator #sideAInput")
   const sideBInput = document.querySelector("#sinesCalculator #sideBInput")
   const betaInput = document.querySelector("#sinesCalculator #betaInput")
   //let result = 0 //change to alpha
   let sideA = sideAInput.value
   let sideB = sideBInput.value
   let beta = betaInput.value

   if (dropdown.value == "alpha") {
      infoElement.innerHTML = `<math><mi>a</mi><mo>=</mo><mi>b</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>&#x3b1;</mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced></mrow></mfrac></math>`
      alpha = Math.asin(Math.sin(beta) * (sideA / sideB))
      resultElement.innerHTML = `α (radians) = ${resultConditioner(alpha)}`
   } else if (dropdown.value == "sideA") {
      infoElement.innerHTML = ``
      resultElement.innerHTML = ``
   }
}

function resultConditioner(result) {
   //Intelligent rounding. Results with only decimal component need sig figs,
   //results greater than 1 do not
   if (result < 1 && result > -1) {
      result = numberWithCommas(+result.toPrecision(4))
   } else {
      result = numberWithCommas(+result.toFixed(4))
   }
   return result
}

function numberWithCommas(number) {
   //taken from SO. Worked better than .toLocaleString()
   return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}
