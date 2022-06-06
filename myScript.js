//Solving Equations
let eq_container = document.querySelector(".eq_btns");
let eq_solution_btn = document.createElement("button");
let eqSol = document.querySelector(".eqSol");
let eqShown = false;
let equation = document.createElement("div");
let operators = ["+", "-", "/", "*"];
let eq_solutionHasBeenClicked;
let equation_solution = document.createElement("div"); 
let leftValue, rightValue;
let randomOperator;

let eq_submit_btn = document.querySelector(".eq_submit_btn");
eq_submit_btn.addEventListener("click", () => {
  if(!eqShown) {
    setEqValues();
    eqShown = true;
  } else {
    clearEqValues();
    eqShown = false;
    eq_solutionHasBeenClicked = false;
    setEqValues();
  }
});

function setEqValues() {
  eq_max_value = document.querySelector(".eq_max_value").value;
  eq_min_value = document.querySelector(".eq_min_value").value;
  eq_int_max_value = parseInt(eq_max_value);
  eq_int_min_value = parseInt(eq_min_value);
  let eq_warning = document.querySelector(".eq_warning-location");
  if(eq_int_max_value === 0 || eq_int_min_value === 0) {
    eq_warning.innerHTML = "Max and Min cannot be zero!"
  } else if (eq_int_max_value !== 0 && !eq_int_max_value) {
    eq_warning.innerHTML = "Must enter a max AND a min value!";
  } else if (eq_int_max_value < eq_int_min_value) {
    eq_warning.innerHTML = "Max value must be larger than min value!";
  } else {
    eq_warning.innerHTML = "";
    getEquation();
  }
}

function getEquation() {
  eq_solution_btn.innerHTML = "Get Solution";
  eq_container.appendChild(eq_solution_btn);
  leftValue = Math.floor(Math.random() * (eq_int_max_value + 1 - eq_int_min_value)) +
    eq_int_min_value;
  rightValue = Math.floor(Math.random() * (eq_int_max_value + 1 - eq_int_min_value)) +
    eq_int_min_value;
  let randomOperatorValue = Math.floor(Math.random() *(4));
  randomOperator = operators[randomOperatorValue];
  equation.innerHTML = `x ${randomOperator} ${leftValue} = ${rightValue}`;
  equation.classList.add("eq_solution");
  eqSol.appendChild(equation);
  eq_solution_btn.classList.add("eq_solution_btn");
  eq_solution_btn.addEventListener("click", () => {
    if (!eq_solutionHasBeenClicked) {
      getEqSolution();
    }
  })
  eqShown = true;
}

function getEqSolution() {
  eq_solutionHasBeenClicked = true;
  let theEqSolution;
  if (randomOperator === "-") {
    theEqSolution = leftValue + rightValue;
  } else if (randomOperator === "+") {
    theEqSolution = rightValue - leftValue;
  } else if(randomOperator === "*") {
    theEqSolution = rightValue / leftValue;
  } else {
    theEqSolution = rightValue * leftValue;
  }
  equation_solution.innerHTML = `x = ${theEqSolution}`;
  eqSol.appendChild(equation_solution);
  equation_solution.classList.add("equation_solution");
}

function clearEqValues() {
  eq_solution_btn.remove();
  equation.remove();
  equation_solution.remove();
}

//Simplifying Radicals
let rad_container = document.querySelector(".rad_btns");
let rad_max_value_loc = document.querySelector(".rad_max_value");
let rad_min_value_loc = document.querySelector(".rad_min_value");
let rad_max_value;
let rad_min_value;
let rad_int_max_value;
let rad_int_min_value;
let radShown = false;
let radicalValue;
let radical = document.createElement("div");
let radSol;
let radicand = document.createElement("span");
let rad_solutionHasBeenClicked;
let rad_solution = document.createElement("div");
let rad_solution_factors = [];
let rad_solution_factors_pairs = [];
let rad_coeff = 1;
let radicand_sol = 1;
let radicand_simp = document.createElement("span");
let rad_symbol = document.createElement("span");
rad_symbol.innerHTML = "";
let rad_solutionBtn = document.createElement("button");

let rad_submit_btn = document.querySelector(".rad_submit_btn");
rad_submit_btn.addEventListener("click", () => {
  if (!radShown) {
    setRadValues();
    radShown = true;
  } else {
    clearRadValues();
    radShown = false;
    rad_solutionHasBeenClicked = false;
    setRadValues();
  }
});

function setRadValues() {
  rad_max_value = document.querySelector(".rad_max_value").value;
  rad_min_value = document.querySelector(".rad_min_value").value;

  rad_int_max_value = parseInt(rad_max_value);
  rad_int_min_value = parseInt(rad_min_value);
  let rad_warning = document.querySelector(".rad_warning-location");
  if (rad_int_max_value < rad_int_min_value) {
    rad_warning.innerHTML = "Max value must be larger than min value!";
  } else if (rad_int_max_value !== 0 && !rad_int_max_value) {
    rad_warning.innerHTML = "Must enter a max AND a min value!";
  } else if (rad_int_min_value !== 0 && !rad_int_min_value) {
    rad_warning.innerHTML = "Must enter a max AND a min value!";
  } //else if (rad_int_max_value <=1  || rad_int_min_value <=1 ) {
  //rad_warning.innerHTML = "Max and min values must be greater than 1.";
  else {
    rad_warning.innerHTML = "";
    getRadical();
  }
}

function getRadical() {
  rad_solutionBtn.classList.add("rad_solution_btn");
  rad_solutionBtn.innerHTML = "Get Solution";
  rad_container.appendChild(rad_solutionBtn);
  rad_solutionBtn.addEventListener("click", () => {
    if (!rad_solutionHasBeenClicked) {
      getRadSolution();
    }
  });
  radicalValue =
    Math.floor(Math.random() * (rad_int_max_value + 1 - rad_int_min_value)) +
    rad_int_min_value;
  radical.innerHTML = `Radical: √`;
  radical.classList.add("radical");
  radicand.innerHTML = `${radicalValue}`;
  radicand.classList.add("radicand");
  radical.appendChild(radicand);
  radSol = document.querySelector(".radSol");
  radSol.appendChild(radical);
  radShown = true;
}

function getRadSolution() {
  radSol.appendChild(rad_solution);

  rad_solutionHasBeenClicked = true;
  for (let i = 2; i <= Math.abs(radicalValue); i++) {
    if (radicalValue % i === 0) {
      rad_solution_factors.push(i);
      radicalValue /= i;
      i--;
    }
  }
  let j = 1;

  for (let i = 0; i < rad_solution_factors.length - 1; i++) {
    if (rad_solution_factors[i] === rad_solution_factors[j]) {
      rad_solution_factors_pairs.push(rad_solution_factors[i]);
      rad_solution_factors.splice(i, 2);
      i--;
      j--;
    }
    j++;
  }

  for (let i = 0; i < rad_solution_factors_pairs.length; i++) {
    rad_coeff *= rad_solution_factors_pairs[i];
  }

  for (let i = 0; i < rad_solution_factors.length; i++) {
    radicand_sol *= rad_solution_factors[i];
  }

  rad_solution.classList.add("rad_solution");
  radicand_simp.classList.add("radicand_sol");
  if (rad_coeff === 1 && radicalValue < 0) {
    rad_solution.innerHTML = `Solution: i`;
  } else if (radicand_sol === 1 && rad_coeff === 1) {
    rad_solution.innerHTML = `Solution: 1`;
  } else if (rad_coeff === 1 && radicalValue > 0) {
    rad_solution.innerHTML = `Solution: `;
  } else if (rad_coeff !== 0 && radicalValue < 0) {
    rad_solution.innerHTML = `Solution: ${rad_coeff}i`;
    console.log(rad_coeff);
  } else if (rad_coeff !== 0 && radicalValue > 0) {
    rad_solution.innerHTML = `Solution: ${rad_coeff}`;
  }

  console.log(radicalValue);
  rad_symbol = "";

  if (radicalValue < -1) {
    radicand_simp /= -1;
  }
  if (radicalValue === 0) {
    rad_solution.innerHTML = `Solution: 0`;
  } else if (radicand_sol === -1 || radicand_sol === 1) {
    radicand_simp.innerHTML = ``;
  } else {
    radicand_simp.innerHTML = `√${radicand_sol}`;
  }
  rad_solution.appendChild(radicand_simp);
}

function clearRadValues() {
  rad_solution.remove();
  radical.remove();
  rad_solutionBtn.remove();
  rad_solution_factors = [];
  rad_solution_factors_pairs = [];
  rad_coeff = 1;
  radicand_sol = 1;
  radicand_simp.innerHTML = "";
}

//Quadratic Factoring
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
let steps_btn = document.createElement("a");
let steps = document.createElement("div");
let step1 = document.createElement("div");
let step2 = document.createElement("div");
let step3 = document.createElement("div");
let step4 = document.createElement("div");
let step5 = document.createElement("div");
let step6 = document.createElement("div");
let stepNote = document.createElement("div");
let theSolution;
let stepsShown;

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
    stepsShown = false;
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
  } else if (int_max_value !== 0 && !int_max_value) {
    warning.innerHTML = "Must enter a max AND a min value!";
  } else if (int_min_value !== 0 && !int_min_value) {
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
    theSolution = `${coefficient}(${factorVal1}x ${sign1} ${factorVal2})²`;
    solution.innerHTML = `Solution: ${theSolution}`;
  } else {
    theSolution = `${coefficient}(${factorVal1}x ${sign1} ${factorVal2})(${factorVal3}x ${sign2} ${factorVal4})`;
    solution.innerHTML = `Solution: ${theSolution}`;
  }
  quadSol.appendChild(solution);
  solutionHasBeenClicked = true;
  steps_btn.classList.add("steps_btn");
  steps_btn.innerHTML = "See Steps";
  quadSol.appendChild(steps_btn);
  steps_btn.addEventListener("click", () => {
    if (!stepsShown) {
      showSteps();
    }
  });
  steps_btn.href = "#the_steps";
}

function showSteps() {
  stepsShown = true;
  let acVals = [];
  let theTop = a * c;
  let bottom = b;
  let fact1, fact2;
  let factor1, factor2;
  let mysign5 = "+";
  theTop = a * c;
  bottom = b;
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

  step1.innerHTML = `Step 1: Find two numbers that multiply to a*c (which is ${theTop}) and add to b (which is ${bottom}). Those two numbers are: ${factor1} and ${factor2}.`;
  steps.appendChild(step1);
  step1.classList.add("a_step");
  step2.classList.add("a_step");
  step3.classList.add("a_step");
  step4.classList.add("a_step");
  step5.classList.add("a_step");
  step6.classList.add("a_step");
  stepNote.classList.add("a_step");
  steps.classList.add("steps");

  let mya = a;
  if (a === 1) {
    mya = "";
  } else if (a === -1) {
    mya = "-";
  }
  let myfactor1 = factor1;
  let mysign1 = "+";
  if (factor1 === 1) {
    myfactor1 = "";
  } else if (factor1 === -1) {
    myfactor1 = "";
    mysign1 = "-";
  } else if (factor1 < 0) {
    myfactor1 *= -1;
    mysign1 = "-";
  }

  let myfactor2 = factor2;
  let mysign2 = "+";
  if (factor2 === 1) {
    myfactor2 = "";
  } else if (factor2 === -1) {
    myfactor2 = "";
    mysign2 = "-";
  } else if (factor2 < 0) {
    myfactor2 *= -1;
    mysign2 = "-";
  }

  let mysign6 = "+";
  let myc = c;
  if (c < 0) {
    myc *= -1;
    mysign6 = "-";
  }

  step2.innerHTML = `Step 2: Rewrite quadratic b-value term (bx) into two parts with the numbers found: ${mya}x² ${mysign1} ${myfactor1}x ${mysign2} ${myfactor2}x ${mysign6} ${myc}.`;
  steps.appendChild(step2);

  let thegcf1 = gcf(findFactors(a), findFactors(factor1));
  if (a < 0) {
    thegcf1 *= -1;
  }
  let mysign3 = "+";
  a /= thegcf1;
  factor1 /= thegcf1;
  if (factor1 < 0) {
    factor1 *= -1;
    mysign3 = "-";
  }

  let mysign4 = "+";
  let thegcf2 = gcf(findFactors(c), findFactors(factor2));
  let thenewgcf2 = thegcf2;
  if (factor2 < 0) {
    thegcf2 *= -1;
    mysign4 = "-";
  }
  c /= thegcf2;
  factor2 /= thegcf2;
  if (c < 0) {
    c *= -1;
    mysign5 = "-";
  }

  if (a === 1 && factor2 === 1) {
    a = "";
    factor2 = "";
  }

  let newgcf1 = thegcf1;
  if (thegcf1 === 1) {
    newgcf1 = "";
  } else if (thegcf1 === -1) {
    newgcf1 = "-";
  }

  step3.innerHTML = `Step 3: Factor out the gcf from the first two terms and the last two terms: ${newgcf1}x(${a}x ${mysign3} ${factor1}) ${mysign4} ${thenewgcf2}(${factor2}x ${mysign5} ${c}).`;
  steps.appendChild(step3);

  step4.innerHTML = `Step 4: Factor out the common binomial to form the product of two binomials: (${newgcf1}x ${mysign4} ${thenewgcf2})(${a}x ${mysign3} ${factor1}).`;
  steps.appendChild(step4);

  let thegcf3 = gcf(findFactors(thegcf1), findFactors(thegcf2));
  if (thegcf1 < 0) {
    thegcf3 *= -1;
  }
  thegcf1 /= thegcf3;
  thegcf2 /= thegcf3;
  if (thegcf1 === 1) {
    thegcf1 = "";
  } else if (thegcf1 === -1) {
    thegcf1 = "-";
  }

  let sign7 = "+";

  if (thegcf2 < 0) {
    thegcf2 *= -1;
    sign7 = "-";
  }

  if (thegcf3 === 1) {
    thegcf3 = "";
  } else if (thegcf3 === -1) {
    thegcf3 = "-";
  }

  step5.innerHTML = `Step 5: Factor out any remaning GCF in each binomial: ${thegcf3}(${thegcf1}x ${sign7} ${thegcf2})(${a}x ${mysign3} ${factor1}).`;
  steps.appendChild(step5);
  steps.appendChild(step6);
  steps.appendChild(stepNote);

  if (thegcf1 === a && sign7 === mysign3 && thegcf2 == factor1) {
    step6.innerHTML = `Step 6: Since the two binomials are equal, you can write it as one binomial squared: ${theSolution}.`;
  } else {
    step6.innerHTML = "";
  }
  if (thegcf1 === a && sign7 === mysign3 && thegcf2 == factor1) {
    stepNote.innerHTML = "";
  } else if (
    theSolution !==
    `${thegcf3}(${thegcf1}x ${sign7} ${thegcf2})(${a}x ${mysign3} ${factor1})`
  ) {
    stepNote.innerHTML = `NOTE: The order of the binomials doesn't matter since ${thegcf3}(${thegcf1}x ${sign7} ${thegcf2})(${a}x ${mysign3} ${factor1}) is equal to ${theSolution}.`;
  } else {
    stepNote.innerHTML = "";
  }
  let theSteps = document.querySelector(".theSteps");
  steps.setAttribute("id", "the_steps");

  theSteps.appendChild(steps);
}

function clearValues() {
  steps.remove();
  steps_btn.remove();
  solution.remove();
  quadratic.remove();
  solutionBtn.remove();
}
