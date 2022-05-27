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
  factorVal1 =
    Math.floor(Math.random() * (int_max_value - int_min_value)) + int_min_value;
  factorVal2 =
    Math.floor(Math.random() * (int_max_value - int_min_value)) + int_min_value;
  factorVal3 =
    Math.floor(Math.random() * (int_max_value - int_min_value)) + int_min_value;
  factorVal4 =
    Math.floor(Math.random() * (int_max_value - int_min_value)) + int_min_value;
}

//sets values when picking coefficients and constants of factors!
function getQuadratic() {
  factorVal1 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  factorVal2 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  factorVal3 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  factorVal4 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  console.log("1 = " + factorVal1);
  console.log("2 = " + factorVal2);
  console.log("3 = " + factorVal3);
  console.log("4 = " + factorVal4);
  if (int_max_value === 0) {
    if (factorVal1 === 0) {
      factorVal1 -= 1;
    }
    if (factorVal2 === 0) {
      factorVal2 -= 1;
    }
    if (factorVal3 === 0) {
      factorVal3 -= 1;
    }
    if (factorVal4 === 0) {
      factorVal4 -= 1;
    }
    if (factorVal1 * factorVal4 + factorVal2 * factorVal3 === 0) {
      factorVal2 -= 1;
    }
  }
  if (int_max_value !== 0) {
    if (factorVal1 === 0) {
      factorVal1 += 1;
    }
    if (factorVal2 === 0) {
      factorVal2 += 1;
    }
    if (factorVal3 === 0) {
      factorVal3 += 1;
    }
    if (factorVal4 === 0) {
      factorVal4 += 1;
    }
    if (factorVal1 * factorVal4 + factorVal2 * factorVal3 === 0) {
      if (factorVal2 === -1) {
        factorVal2 += 2;
      } else {
        factorVal2 += 1;
      }
    }
  }
  console.log("1 = " + factorVal1);
  console.log("2 = " + factorVal2);
  console.log("3 = " + factorVal3);
  console.log("4 = " + factorVal4);
  a = factorVal1 * factorVal3;
  b = factorVal1 * factorVal4 + factorVal2 * factorVal3;
  c = factorVal2 * factorVal4;

  quadratic = document.createElement("div");
  quadratic.classList.add("quadratic");
  if (a === 1) {
    a = "";
  }
  if (a === -1) {
    a = "-";
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

  quadratic.innerHTML = `${a}x² ${sign1} ${b}x ${sign2} ${c}`;
  container.appendChild(quadratic);
  factorShown = true;
  solutionBtn = document.createElement("button");
  solutionBtn.classList.add("solution_btn");
  solutionBtn.innerHTML = "Get Solution";
  container.appendChild(solutionBtn);
  solutionBtn.addEventListener("click", () => {
    if (!solutionHasBeenClicked) {
      getSolution();
    }
  });
}

//finds all the factors of a number
function findFactors(value) {
  let divisors = [];
  for (let i = 1; i <= Math.abs(value); i++) {
    if (value % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

//finds gcf of the factors of each number
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
  console.log("1 = " + factorVal1);
  console.log("2 = " + factorVal2);
  console.log("3 = " + factorVal3);
  console.log("4 = " + factorVal4);

  solution = document.createElement("div");
  solution.classList.add("solution");
  let array1 = findFactors(factorVal1);
  let array2 = findFactors(factorVal2);
  let gcf1 = gcf(array1, array2);
  if (factorVal1 < 0) {
    gcf1 *= -1;
  }

  let array3 = findFactors(factorVal3);
  let array4 = findFactors(factorVal4);
  let gcf2 = gcf(array3, array4);
  console.log(gcf2);
  if (factorVal3 < 0) {
    gcf2 *= -1;
  }

  if (gcf1 !== 1 && gcf2 === 1) {
    coefficient = gcf1;
    if (coefficient === -1) {
      coefficient = "-";
    } else if (coefficient === 1) {
      coefficient = "";
    }
    factorVal1 /= gcf1;
    factorVal2 /= gcf1;
  } else if (gcf2 !== 1 && gcf1 === 1) {
    coefficient = gcf2;
    if (coefficient === -1) {
      coefficient = "-";
    } else if (coefficient === 1) {
      coefficient = "";
    }
    factorVal3 /= gcf2;
    factorVal4 /= gcf2;
  } else if (gcf1 !== 1 && gcf2 !== 1) {
    coefficient = gcf1 * gcf2;
    if (coefficient === -1) {
      coefficient = "-";
    } else if (coefficient === 1) {
      coefficient = "";
    }
    factorVal1 /= gcf1;
    factorVal2 /= gcf1;
    factorVal3 /= gcf2;
    factorVal4 /= gcf2;
  } else {
    coefficient = "";
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
  console.log("1 = " + factorVal1);
  console.log("2 = " + factorVal2);
  console.log("3 = " + factorVal3);
  console.log("4 = " + factorVal4);
  if (factorVal1 === factorVal3 && factorVal2 === factorVal4) {
    solution.innerHTML = `${coefficient}(${factorVal1}x ${sign1} ${factorVal2})²`;
  } else {
    solution.innerHTML = `${coefficient}(${factorVal1}x ${sign1} ${factorVal2})(${factorVal3}x ${sign2} ${factorVal4})`;
  }
  container.appendChild(solution);
  solutionHasBeenClicked = true;
}

function clearValues() {
  solution.remove();
  quadratic.remove();
  solutionBtn.remove();
}
