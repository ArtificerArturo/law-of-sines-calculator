function calculateSines() {
   const dropdown = document.querySelector("#sinesCalculator #dropdown")
   const sideAInput = document.querySelector("#sinesCalculator #sideAInput")
   const sideBInput = document.querySelector("#sinesCalculator #sideBInput")
   const alphaInput = document.querySelector("#sinesCalculator #alphaInput")
   const betaInput = document.querySelector("#sinesCalculator #betaInput")
   const infoElement = document.querySelector("#sinesCalculator .info")
   const resultElement = document.querySelector("#sinesCalculator .result")

   let sideA = sideAInput?.value
   let sideB = sideBInput?.value
   let alpha = alphaInput?.value
   let beta = betaInput?.value
   let intermediate = 0
   let issueCount = 0
   let info1 = document.createElement("div")
   let info2 = document.createElement("div")
   let info3 = document.createElement("div")
   let info4 = document.createElement("div")

   //clear any previous answers or error messages
   infoElement.style.color = "black"
   resultElement.innerHTML = ""
   infoElement.innerHTML = ""

   //check for invalid input
   //these only appear in a set order, irrespective of the input field order
   if (sideA <= 0) {
      infoElement.innerHTML += `Please use a positive value for side a.<br>`
      issueCount++
   }
   if (sideB <= 0) {
      infoElement.innerHTML += `Please use a positive value for side b.<br>`
      issueCount++
   }
   if (alpha <= 0 || alpha >= 180) {
      infoElement.innerHTML += `Please use a value between 0 and 180° for angle α.<br>`
      issueCount++
   }
   if (beta <= 0 || beta >= 180) {
      infoElement.innerHTML += `Please use a value between 0 and 180° for angle β.<br>`
      issueCount++
   }
   if (issueCount > 0) {
      infoElement.style.color = "red"
      return
   }

   if (dropdown.value == "alpha") {
      alpha = Math.asin(Math.sin(degreetoRad(beta)) * (sideA / sideB))
      if (isNaN(alpha)) {
         infoElement.style.color = "red"
         infoElement.innerHTML += "There is no valid solution for α with these input values."
         return
      }
      intermediate = Math.sin(degreetoRad(beta)) * (sideA / sideB)
      info3.innerHTML = "Solving for alpha and plugging in our values:"
      info4.innerHTML = `<math><mi>&#x3b1;</mi><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced><mo>&#xd7;</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mi>${beta}<mo>&#xb0;</mo></mi></mfenced><mo>&#xd7;</mo><mfrac><mi>${sideA}</mi><mi>${sideB}</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mi>${resultConditioner(
         intermediate
      )}</mi></mfenced><mo>&#x2248;</mo><mi>${resultConditioner(
         radToDegree(alpha)
      )}<mo>&#xb0;</mo></mi></math>`
      resultElement.innerHTML = `α = ${resultConditioner(radToDegree(alpha))}°`
   } else if (dropdown.value == "sideA") {
      sideA = sideB * (Math.sin(degreetoRad(alpha)) / Math.sin(degreetoRad(beta)))
      info3.innerHTML = "Plugging in our values:"
      info4.innerHTML = `<math><mi>a</mi><mo>=</mo><mi>${sideB}</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>${resultConditioner(
         degreetoRad(alpha)
      )}<mo>&#xb0;</mo></mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>${resultConditioner(
         degreetoRad(beta)
      )}<mo>&#xb0;</mo></mi></mfenced></mrow></mfrac><mo>&#x2248;</mo><mn>${resultConditioner(
         sideA
      )}</mn></math>`
      resultElement.innerHTML = `Side a = ${resultConditioner(sideA)}`
   } else if (dropdown.value == "sideB") {
      sideB = sideA * (Math.sin(degreetoRad(beta)) / Math.sin(degreetoRad(alpha)))
      info3.innerHTML = "Solving for b and plugging in our values:"
      info4.innerHTML = `<math><mi>b</mi><mo>=</mo><mi>a</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>&#x3b1;</mi></mfenced></mrow></mfrac><mo>=</mo><mi>${sideA}</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>${alpha}<mo>&#xb0;</mo></mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>${beta}<mo>&#xb0;</mo></mi></mfenced></mrow></mfrac><mo>&#x2248;</mo><mn>${resultConditioner(
         sideB
      )}</mn></math>`
      resultElement.innerHTML = `Side b = ${resultConditioner(sideB)}`
   } else if (dropdown.value == "beta") {
      beta = Math.asin(Math.sin(degreetoRad(alpha)) * (sideB / sideA))
      if (isNaN(beta)) {
         infoElement.style.color = "red"
         infoElement.innerHTML += "There is no valid solution for β with these input values."
         return
      }
      intermediate = Math.sin(degreetoRad(alpha) * (sideB / sideA))
      info3.innerHTML = "Solving for beta and plugging in our values:"
      info4.innerHTML = `<math><mi>&#x3b2;</mi><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mi>&#x3b1;</mi></mfenced><mo>&#xd7;</mo><mfrac><mi>b</mi><mi>a</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mrow><mi>sin</mi><mfenced><mrow><mi>${alpha}</mi><mo>&#xb0;</mo></mrow></mfenced><mo>&#xd7;</mo><mfrac><mi>${sideB}</mi><mi>${sideA}</mi></mfrac></mrow></mfenced><mo>=</mo><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mfenced><mi>${resultConditioner(
         intermediate
      )}</mi></mfenced><mo>&#x2248;</mo><mi>${resultConditioner(
         radToDegree(beta)
      )}<mo>&#xb0;</mo></mi></math>`
      resultElement.innerHTML = `β = ${resultConditioner(radToDegree(beta))}°`
   }

   info1.innerHTML = "The equation we'll use is:"
   info2.innerHTML =
      "<math><mi>a</mi><mo>=</mo><mi>b</mi><mo>&#xd7;</mo><mfrac><mrow><mi>sin</mi><mfenced><mi>&#x3b1;</mi></mfenced></mrow><mrow><mi>sin</mi><mfenced><mi>&#x3b2;</mi></mfenced></mrow></mfrac></math>"

   infoElement.appendChild(info1)
   infoElement.appendChild(info2)
   infoElement.appendChild(info3)
   infoElement.appendChild(info4)

   MathJax.typesetPromise() //style all new mathml because mathjax otherwise only runs on page load
   changeImage('Blank.svg')
}

function changeFields() {
   const inputFields = document.querySelector("#sinesCalculator #inputFields")
   const dropdown = document.querySelector("#sinesCalculator #dropdown")
   const resultElement = document.querySelector("#sinesCalculator .result")
   const infoElement = document.querySelector("#sinesCalculator .info")

   let sideALabel = document.createElement("label")
   sideALabel.setAttribute("for", "sideAInput")
   sideALabel.textContent = "a side"

   let sideAInput = document.createElement("input")
   sideAInput.setAttribute("type", "number")
   sideAInput.setAttribute("placeholder", "Enter value")
   sideAInput.setAttribute("ID", "sideAInput")
   sideAInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")
   sideAInput.setAttribute("onfocus", "changeImage('SideABlue.svg')")

   let sideACombo = document.createElement("div")
   sideACombo.setAttribute("class", "labelInputCombo")
   sideACombo.appendChild(sideALabel)
   sideACombo.appendChild(sideAInput)

   let sideBLabel = document.createElement("label")
   sideBLabel.setAttribute("for", "sideBInput")
   sideBLabel.textContent = "b side"

   let sideBInput = document.createElement("input")
   sideBInput.setAttribute("type", "number")
   sideBInput.setAttribute("placeholder", "Enter value")
   sideBInput.setAttribute("ID", "sideBInput")
   sideBInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")
   sideBInput.setAttribute("onfocus", "changeImage('SideBBlue.svg')")

   let sideBCombo = document.createElement("div")
   sideBCombo.setAttribute("class", "labelInputCombo")
   sideBCombo.appendChild(sideBLabel)
   sideBCombo.appendChild(sideBInput)

   let alphaLabel = document.createElement("label")
   alphaLabel.setAttribute("for", "alphaInput")
   alphaLabel.textContent = "α alpha"

   let alphaInput = document.createElement("input")
   alphaInput.setAttribute("type", "number")
   alphaInput.setAttribute("placeholder", "Enter value")
   alphaInput.setAttribute("ID", "alphaInput")
   alphaInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")
   alphaInput.setAttribute("onfocus", "changeImage('AngleAlphaBlue.svg')")

   let alphaCombo = document.createElement("div")
   alphaCombo.setAttribute("class", "labelInputCombo")
   alphaCombo.appendChild(alphaLabel)
   alphaCombo.appendChild(alphaInput)

   let betaLabel = document.createElement("label")
   betaLabel.setAttribute("for", "betaInput")
   betaLabel.textContent = "β beta"

   let betaInput = document.createElement("input")
   betaInput.setAttribute("type", "number")
   betaInput.setAttribute("placeholder", "Enter value")
   betaInput.setAttribute("ID", "betaInput")
   betaInput.setAttribute("onkeyup", "if (event.key === 'Enter') calculateSines()")
   betaInput.setAttribute("onfocus", "changeImage('AngleBetaBlue.svg')")

   let betaCombo = document.createElement("div")
   betaCombo.setAttribute("class", "labelInputCombo")
   betaCombo.appendChild(betaLabel)
   betaCombo.appendChild(betaInput)

   inputFields.replaceChildren()

   if (dropdown.value == "alpha") {
      inputFields.appendChild(sideACombo)
      inputFields.appendChild(sideBCombo)
      inputFields.appendChild(betaCombo)
   } else if (dropdown.value == "sideA") {
      inputFields.appendChild(alphaCombo)
      inputFields.appendChild(sideBCombo)
      inputFields.appendChild(betaCombo)
   } else if (dropdown.value == "sideB") {
      inputFields.appendChild(sideACombo)
      inputFields.appendChild(alphaCombo)
      inputFields.appendChild(betaCombo)
   } else if (dropdown.value == "beta") {
      inputFields.appendChild(sideACombo)
      inputFields.appendChild(alphaCombo)
      inputFields.appendChild(sideBCombo)
   }
   resultElement.innerHTML = ""
   infoElement.innerHTML = ""
   changeImage('Blank.svg')
}

function changeImage(fileName) {
   const image = document.querySelector("#sinesCalculator #image img")
   image.setAttribute("src", fileName)
}

function resultConditioner(number) {
   //Intelligent rounding. Results with only decimal component need sig figs,
   //results greater than 1 do not
   if (number < 1 && number > -1) {
      number = numberWithCommas(+number.toPrecision(2))
   } else {
      number = numberWithCommas(+number.toFixed(2))
   }
   return number
}

function numberWithCommas(number) {
   //taken from SO. Worked better than .toLocaleString()
   return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function degreetoRad(number) {
   return number * (Math.PI / 180)
}

function radToDegree(number) {
   return number * (180 / Math.PI)
}
