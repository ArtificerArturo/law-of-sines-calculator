function calculateSines() {
   const dropdown = document.querySelector("#sinesCalculator #dropdown")
   const resultElement = document.querySelector("#sinesCalculator .result")
   const infoElement = document.querySelector("#sinesCalculator .info")
   const sideAInput = document.querySelector("#sinesCalculator #sideAInput")
   const sideBInput = document.querySelector("#sinesCalculator #sideBInput")
   const alphaInput = document.querySelector("#sinesCalculator #alphaInput")
   const betaInput = document.querySelector("#sinesCalculator #betaInput")

   let sideA = sideAInput?.value
   let sideB = sideBInput?.value
   let alpha = alphaInput?.value
   let beta = betaInput?.value
   let intermediate = 0
   infoElement.innerHTML =
      "The equation we'll use is:<br><math><mi>a</mi><mo>=</mo><mi>b</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>&#x3b1;</mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced></mrow></mfrac></math>"

   if (dropdown.value == "alpha") {
      alpha = Math.asin(Math.sin(beta) * (sideA / sideB))
      intermediate = Math.sin(beta) * (sideA / sideB)
      let explanation = document.createElement("div")
      explanation.innerHTML += `Solving for alpha:<br><math><mi>&#x3b1;</mi><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced><mo>&#xd7;</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mi>${beta}</mi></mfenced><mo>&#xd7;</mo><mfrac><mi>${sideA}</mi><mi>${sideB}</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mi>${resultConditioner(
         intermediate
      )}</mi></mfenced><mo>&#x2248;</mo><mi>${resultConditioner(alpha)}</mi><mo>&#xb0;</mo></math>`
      infoElement.appendChild(explanation)
      resultElement.innerHTML = `α (radians) = ${resultConditioner(alpha)}`
   } else if (dropdown.value == "sideA") {
      sideA = sideB * (Math.sin(alpha) / Math.sin(beta))
      resultElement.innerHTML = `Side a = ${resultConditioner(sideA)}`
   } else if (dropdown.value == "sideB") {
      sideB = sideA * (Math.sin(beta) / Math.sin(alpha))
      resultElement.innerHTML = `Side b = ${resultConditioner(sideB)}`
   } else if (dropdown.value == "beta") {
      beta = Math.asin(Math.sin(alpha) * (sideB / sideA))
      resultElement.innerHTML = `β (radians) = ${resultConditioner(beta)}`
   }
   MathJax.typesetPromise()
}

function changeFields() {
   const inputFields = document.querySelector("#sinesCalculator #inputFields")
   const dropdown = document.querySelector("#sinesCalculator #dropdown")
   const resultElement = document.querySelector("#sinesCalculator .result")

   let sideALabel = document.createElement("label")
   sideALabel.setAttribute("for", "sideAInput")
   sideALabel.textContent = "a side"

   let sideAInput = document.createElement("input")
   sideAInput.setAttribute("type", "number")
   sideAInput.setAttribute("placeholder", "Enter value")
   sideAInput.setAttribute("ID", "sideAInput")
   sideAInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")

   let sideBLabel = document.createElement("label")
   sideBLabel.setAttribute("for", "sideBInput")
   sideBLabel.textContent = "b side"

   let sideBInput = document.createElement("input")
   sideBInput.setAttribute("type", "number")
   sideBInput.setAttribute("placeholder", "Enter value")
   sideBInput.setAttribute("ID", "sideBInput")
   sideBInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")

   let alphaLabel = document.createElement("label")
   alphaLabel.setAttribute("for", "alphaInput")
   alphaLabel.textContent = "α alpha"

   let alphaInput = document.createElement("input")
   alphaInput.setAttribute("type", "number")
   alphaInput.setAttribute("placeholder", "Enter value")
   alphaInput.setAttribute("ID", "alphaInput")
   alphaInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")

   let betaLabel = document.createElement("label")
   betaLabel.setAttribute("for", "betaInput")
   betaLabel.textContent = "β beta"

   let betaInput = document.createElement("input")
   betaInput.setAttribute("type", "number")
   betaInput.setAttribute("placeholder", "Enter value")
   betaInput.setAttribute("ID", "betaInput")
   betaInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")

   let labelDiv = document.createElement("div")
   labelDiv.setAttribute("ID", "labelDiv")
   let fieldDiv = document.createElement("div")
   fieldDiv.setAttribute("ID", "fieldDiv")

   inputFields.replaceChildren()

   if (dropdown.value == "alpha") {
      labelDiv.appendChild(sideALabel)
      labelDiv.appendChild(sideBLabel)
      labelDiv.appendChild(betaLabel)
      fieldDiv.appendChild(sideAInput)
      fieldDiv.appendChild(sideBInput)
      fieldDiv.appendChild(betaInput)
   } else if (dropdown.value == "sideA") {
      labelDiv.appendChild(alphaLabel)
      labelDiv.appendChild(sideBLabel)
      labelDiv.appendChild(betaLabel)
      fieldDiv.appendChild(alphaInput)
      fieldDiv.appendChild(sideBInput)
      fieldDiv.appendChild(betaInput)
   } else if (dropdown.value == "sideB") {
      labelDiv.appendChild(sideALabel)
      labelDiv.appendChild(alphaLabel)
      labelDiv.appendChild(betaLabel)
      fieldDiv.appendChild(sideAInput)
      fieldDiv.appendChild(alphaInput)
      fieldDiv.appendChild(betaInput)
   } else if (dropdown.value == "beta") {
      labelDiv.appendChild(sideALabel)
      labelDiv.appendChild(alphaLabel)
      labelDiv.appendChild(sideBLabel)
      fieldDiv.appendChild(sideAInput)
      fieldDiv.appendChild(alphaInput)
      fieldDiv.appendChild(sideBInput)
   }
   inputFields.appendChild(labelDiv)
   inputFields.appendChild(fieldDiv)
   resultElement.innerHTML = ""
   infoElement.innerHTML = ""
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
