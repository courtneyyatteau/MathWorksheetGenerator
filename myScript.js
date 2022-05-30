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
let a;
let b, c;
let quadSol = document.querySelector(".quadSol");
let steps_btn = document.createElement("button");

let aval = document.getElementById("avalue");
aval.addEventListener("change", aClicked);
function aClicked() {
  if (aval.checked) {
    factorVal1 = 1;
    factorVal3 = 1;
  }
}

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
  factorVal2 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  factorVal4 =
    Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
    int_min_value;
  if (aval.checked) {
    factorVal1 = 1;
    factorVal3 = 1;
  } else {
    factorVal1 =
      Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
      int_min_value;
    factorVal3 =
      Math.floor(Math.random() * (int_max_value + 1 - int_min_value)) +
      int_min_value;
  }
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

  the_a = factorVal1 * factorVal3;
  the_b = factorVal1 * factorVal4 + factorVal2 * factorVal3;
  the_c = factorVal2 * factorVal4;
  a = factorVal1 * factorVal3;
  b = factorVal1 * factorVal4 + factorVal2 * factorVal3;
  c = factorVal2 * factorVal4;

  quadratic = document.createElement("div");
  quadratic.classList.add("quadratic");
  if (the_a == 1) {
    the_a = "";
  }
  if (the_a == -1) {
    the_a = "-";
  }
  let sign1 = "+";
  let sign2 = "+";

  if (b < 0) {
    sign1 = "-";
    the_b *= -1;
  }
  if (c < 0) {
    sign2 = "-";
    the_c *= -1;
  }

  if (the_b == 1 || the_b == -1) {
    quadratic.innerHTML = `Quadratic: ${the_a}x² ${sign1} x ${sign2} ${the_c}`;
  } else {
    quadratic.innerHTML = `Quadratic: ${the_a}x² ${sign1} ${the_b}x ${sign2} ${the_c}`;
  }
  quadSol.appendChild(quadratic);
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

  if (factorVal1 === factorVal3 && factorVal2 === factorVal4) {
    solution.innerHTML = `Solution: ${coefficient}(${factorVal1}x ${sign1} ${factorVal2})²`;
  } else {
    solution.innerHTML = `Solution: ${coefficient}(${factorVal1}x ${sign1} ${factorVal2})(${factorVal3}x ${sign2} ${factorVal4})`;
  }
  quadSol.appendChild(solution);
  solutionHasBeenClicked = true;
  steps_btn.classList.add("steps_btn");
  steps_btn.innerHTML = "See Steps";
  quadSol.appendChild(steps_btn);
  steps_btn.addEventListener("click", showSteps);
}

function showSteps() {
  console.log("CHECK");
  let acVals = [];
  let theTop = a * c;
  let bottom = b;
  let fact1, fact2;
  let factor1, factor2;
  theTop = a * c;
  bottom = b;
  console.log("The Top: " + theTop);
  for (let i = 1; i <= Math.abs(theTop); i++) {
    for (let j = 1; j <= Math.abs(theTop); j++) {
      if (i * j == Math.abs(theTop)) {
        if (theTop > 0 && bottom < 0) {
          fact1 = -1 * i;
          fact2 = -1 * j;
        } else if (theTop > 0 && bottom > 0) {
          fact1 = i;
          fact2 = j;
        } else if (theTop < 0 && bottom > 0) {
          fact1 = i;
          fact2 = -1 * j;
        } else {
          fact1 = -1 * i;
          fact2 = j;
        }
        acVals.push({ fact1, fact2 });
      }
    }
  }

  for (let i = 0; i < acVals.length; i++) {
    if (acVals[i].fact1 + acVals[i].fact2 === bottom) {
      factor1 = acVals[i].fact1;
      factor2 = acVals[i].fact2;
    }
  }
  console.log(
    `Step 1: Find two numbers that multiply to ${theTop} and add to ${bottom}`
  );
  console.log(`Those two numbers are: ${factor1} and ${factor2}`);
  console.log(
    `Step 2: Rewrite quadratic b-value term (bx) into two parts with the numbers found: ${a}x² + ${factor1}x + ${factor2}x + ${c}`
  );
  console.log(
    `Step 3: Factor out the gcf from the first two terms and the last two terms.`
  );

  let thegcf1 = gcf(findFactors(a), findFactors(factor1));
  if (a < 0) {
    thegcf1 *= -1;
  }
  let thegcf2 = gcf(findFactors(c), findFactors(factor2));
  if (factor2 < 0) {
    thegcf2 *= -1;
  }
  a /= thegcf1;
  factor1 /= thegcf1;
  c /= thegcf2;
  factor2 /= thegcf2;
  console.log(thegcf1 + " and " + thegcf2);
  console.log(
    `${thegcf1} and ${thegcf2}(${a}x + ${factor1})(${factor2}x + ${c})`
  );
}

function clearValues() {
  steps_btn.remove();
  solution.remove();
  quadratic.remove();
  solutionBtn.remove();
}
