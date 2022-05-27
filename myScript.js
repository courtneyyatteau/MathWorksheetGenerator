let container = document.querySelector(".stuff");
let max_value_loc = document.querySelector(".max_value");
let min_value_loc = document.querySelector(".min_value");
let factLoc1;
let factLoc2;
let quadratic;
let max_value;
let min_value;
let int_max_value;
let int_min_value;
let solutionBtn;
let factorShown = false;
let factorVal1, factorVal2, factorVal3, factorVal4;
let solution = document.createElement("div");
let coefficient;
let solutionHasBeenClicked;
let a, b, c;

let submit_btn = document.querySelector(".submit_btn");
submit_btn.addEventListener("click", () => {
  solutionHasBeenClicked = false;
  if (!factorShown) {
    setValues();
  } else {
    clearValues();
    factorShown = false;
    setValues();
  }
});

function setValues() {
  max_value = document.querySelector(".max_value").value;
  min_value = document.querySelector(".min_value").value;

  int_max_value = parseInt(max_value);
  int_min_value = parseInt(min_value);
  let warning = document.querySelector(".warning-location");
  if (int_max_value < int_min_value) {
    warning.innerHTML = "Max value must be larger than min value!";
  } else if (!(int_max_value && int_min_value)) {
    warning.innerHTML = "Must enter a max AND a min value!";
  } else {
    warning.innerHTML = "";
    getQuadratic();
  }
}

//sets values when picking coefficients and constants of the quadratic!
function getQuad() {
  factorVal1 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal2 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal3 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal4 = Math.floor(Math.random() * int_max_value) + int_min_value;
}

//sets values when picking coefficients and constants of factors!
function getQuadratic() {
  factorVal1 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal2 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal3 = Math.floor(Math.random() * int_max_value) + int_min_value;
  factorVal4 = Math.floor(Math.random() * int_max_value) + int_min_value;
  if (factorVal1 === 0) {
    factorVal1 += 1;
  }

  if (factorVal3 === 0) {
    factorVal3 += 1;
  }

  a = factorVal1 * factorVal3;
  b = factorVal1 * factorVal4 + factorVal2 * factorVal3;
  c = factorVal2 * factorVal4;

  quadratic = document.createElement("div");
  if (a === 1 || a === -1) {
    a = "";
  }
  if (b === 1 || b === -1) {
    b = "";
  }
  let sign1 = "+";
  let sign2 = "+";
  if (b < 0) {
    sign1 = "-";
    b *= -1;
  }
  if (c < 0) {
    sign2 = "-";
    c *= -1;
  }
  if (b !== 0 && c !== 0) {
    quadratic.innerHTML = `${a}x² ${sign1} ${b}x ${sign2} ${c}`;
  } else if (b === 0) {
    quadratic.innerHTML = `${a}x² ${sign2} ${c}`;
  } else {
    quadratic.innerHTML = `${a}x² ${sign1} ${b}x`;
  }
  container.appendChild(quadratic);
  factorShown = true;
  solutionBtn = document.createElement("button");
  solutionBtn.innerHTML = "Get Solution";
  container.appendChild(solutionBtn);
  solutionBtn.addEventListener("click", () => {
    if (!solutionHasBeenClicked) {
      getSolution();
    }
  });
}

function findFactors(value) {
  let divisors = [];
  for (let i = 1; i <= value; i++) {
    if (value % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

function gcf(array1, array2) {
  let gcfValue = 1;
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j] && array1[i] > gcfValue) {
        gcfValue = array1[i];
      }
    }
  }
  return gcfValue;
}

function getSolution() {
  solution = document.createElement("div");
  let array1 = findFactors(factorVal1);
  let array2 = findFactors(factorVal2);
  let gcf1 = gcf(array1, array2);
  if (factorVal1 < 0 && factorVal3 > 0) {
    gcf1 *= -1;
  }

  let array3 = findFactors(factorVal3);
  let array4 = findFactors(factorVal4);
  let gcf2 = gcf(array3, array4);
  if (factorVal3 < 0 && factor1 > 0) {
    gcf2 *= -1;
  }
  if (gcf1 !== 1 && gcf2 === 1) {
    coefficient = gcf1;
    factorVal1 /= gcf1;
    factorVal2 /= gcf1;
  } else if (gcf2 !== 1 && gcf1 === 1) {
    coefficient = gcf2;
    factorVal3 /= gcf2;
    factorVal4 /= gcf2;
  } else if (gcf1 !== 1 && gcf2 !== 1) {
    coefficient = gcf1 * gcf2;
    factorVal1 /= gcf1;
    factorVal2 /= gcf1;
    factorVal3 /= gcf2;
    factorVal4 /= gcf2;
  } else {
    coefficient = "";
  }
  if (coefficient === -1) {
    coefficient = "-";
  }
  if (factorVal1 === 1) {
    factorVal1 = "";
  }
  if (factorVal3 === 1) {
    factorVal3 = "";
  }
  let sign1 = "+";
  let sign2 = "+";
  if (factorVal2 < 0) {
    sign1 = "-";
    factorVal2 *= -1;
  }
  if (factorVal4 < 0) {
    sign2 = "-";
    factorVal4 *= -1;
  }
  if (factorVal2 !== 0 && c !== 0) {
    solution.innerHTML = `${coefficient}(${factorVal1}x ${sign1} ${factorVal2})(${factorVal3}x ${sign2} ${factorVal4})`;
  } else if (factorVal2 === 0 && c !== 0) {
    let gcfCoeff = coefficient * factorVal1;
    solution.innerHTML = `${gcfCoeff}x(${factorVal3}x + ${factorVal4})`;
  } else if (c === 0) {
    solution.innerHTML = `${coefficient}x(${factorVal1}x + ${factorVal3})`;
  } else {
    solution.innerHTML = "Not factorable";
  }
  container.appendChild(solution);
  solutionHasBeenClicked = true;
}

function clearValues() {
  solution.remove();
  quadratic.remove();
  solutionBtn.remove();
}
