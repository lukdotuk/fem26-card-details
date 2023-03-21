let cardPattern = "0000 0000 0000 0000";
let mmPattern = /^((0[1-9])|(1[0-2]))$/;
let cvcPattern = "000";

let cardValue = "";
let mmValue = "";
let yyValue = "";
let cvcValue = "";
let error = false;

secTwo = document.getElementById("sec-two");
secThree = document.getElementById("sec-three");

let fullNameInput = document.getElementById("full-name-input");
let cardNoInput = document.getElementById("card-no-input");
let mmInput = document.getElementById("mm-input");
let yyInput = document.getElementById("yy-input");
let cvcInput = document.getElementById("cvc-input");

let fullNameOutput = document.getElementById("full-name-output");
let cardNoOutput = document.getElementById("card-no-output");
let mmYyOutput = document.getElementById("mm-dd-output");
let cvcOutput = document.getElementById("cvc-output");

let warningName = document.getElementById("warning-name");
let warningCard = document.getElementById("warning-card");
let warningMm = document.getElementById("warning-mm");
let warningYy = document.getElementById("warning-yy");
let warningCvc = document.getElementById("warning-cvc");

let warningMsgOne =  "Can't be blank";
let warningMsgTwo =  "Wrong input format";
let warningMsgThree =  "Wrong input";
let warningMsgFour =  "";

// reset
function reset() {
  cardNoInput.value = "";
  fullNameInput.value = "";
  mmInput.value = "";
  yyInput.value = "";
  cvcInput.value = "";
}


// error handler
function warning(inputField, warningField, warningMsg) {
  inputField.style.borderColor = "hsl(var(--clr-primary-100))";
  inputField.style.background = "hsla(var(--clr-primary-100), .1)";
  warningField.innerHTML = warningMsg;
  error = true;
}

function warningReset(inputField, warningField, warningMsg) {
  inputField.style.borderColor = "initial";
  inputField.style.background = "initial";
  warningField.innerHTML = warningMsg;
  error = false;
}

// continue btn
function stageTwo() {
  if(fullNameInput.value == "") { warning(fullNameInput, warningName, warningMsgOne) }
  if(cardNoInput.value == "") { warning(cardNoInput, warningCard, warningMsgOne) }
  if(mmInput.value == "") { warning(mmInput, warningMm, warningMsgOne) }
  if(yyInput.value == "") { warning(yyInput, warningYy, warningMsgOne) }
  if(cvcInput.value =="") { warning(cvcInput, warningCvc, warningMsgOne) }
  
  if(!error) {
    secTwo.style.visibility = "hidden";
    secThree.style.visibility = "visible";
  }
}

// Name events
fullNameInput.addEventListener("input", () => {
  fullNameOutput.innerHTML = fullNameInput.value;
  warningReset(fullNameInput, warningName, warningMsgFour);
})

fullNameInput.addEventListener("focusout", () => {
  if(fullNameInput.value == "") {
    warning(fullNameInput, warningName, warningMsgOne);
  }
})

// card events
cardNoInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D+/g, '').replace(/(.{4})/g, '$1 ').trim();
  cardNoOutput.innerHTML = e.target.value + cardPattern.substring(e.target.value.length, 19);
  cardValue = e.target.value;
});

cardNoInput.addEventListener("focusout", () => {
  if(cardValue.length == 19) {
    warningReset(cardNoInput, warningCard, warningMsgFour);
    console.log("reset " + cardValue.length);
  } else {
    if(cardValue.length == 0) {
      warning(cardNoInput, warningCard, warningMsgOne);
    } else {
      warning(cardNoInput, warningCard, warningMsgTwo);
    }
  }
})

// month events
mmInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  mmValue = e.target.value;
})

mmInput.addEventListener("focusout", () => {
  if(mmValue.length == 1) {
    mmValue = "0" + mmValue;
  }
  mmInput.value = mmValue;
  if(mmPattern.test(mmValue)) { 
    mmYyOutput.innerText = mmValue + mmYyOutput.innerText.substring(2,5);
    warningReset(mmInput, warningMm, warningMsgFour);
  } else {
    if(mmValue.length == 0) {
      warning(mmInput, warningMm, warningMsgOne);
    } else {
      warning(mmInput, warningMm, warningMsgThree);
    }
  }
})

// year events
yyInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  yyValue = e.target.value;
})

yyInput.addEventListener("focusout", () => {
  if(yyValue >= new Date().getFullYear() - 2000) {
    mmYyOutput.innerText = mmYyOutput.innerText.substring(0,3) + yyValue;
    warningReset(yyInput, warningYy, warningMsgFour);
  } else {
    if(yyValue.length == 0) {
      warning(yyInput, warningYy, warningMsgOne);
    } else {
      warning(yyInput, warningYy, warningMsgThree);
    }
  }
})

// cvc events
cvcInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
  cvcOutput.innerHTML = e.target.value + cvcPattern.substring(e.target.value.length, 19);
  cvcValue = e.target.value;
})

cvcInput.addEventListener("focusout", () => {
  if(cvcValue.length == 3) {
    warningReset(cvcInput, warningCvc, warningMsgFour);
  } else {
    if(cvcValue.length == 0) {
      warning(cvcInput, warningCvc, warningMsgOne);
    } else {
      warning(cvcInput, warningCvc, warningMsgThree);
    }
  }
})