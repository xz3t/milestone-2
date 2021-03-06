/*jshint esversion: 6 */
var num = Array.from({ length: 10 }, (_v, k) => k * 1); // 10 numbers to include 0-9
var letters = Array.from({ length: 26 }, (_v, k) => k * 1); // 26 numbers for letters in alphabet
var punctuation = Array.from({ length: 17 }, (_v, k) => k * 1); // 17 numbers for punctuation cards
var matches = 0;
var playSound = true;
var sound = true;
var gameType = 1; // gametype: 1 = numbers, 2= letters, 3=punctuation
var lastKnownButtonId, lastKnownButtonNumber, wait, i, numbers; // declared all further used variables

const buttons = document.querySelectorAll("button");

// run intialization script
function initGame() {
  numbers = getRandom(num, 8); //get 8 random numbers from num array
  shuffle(numbers);
  distributeNumbers(gameType);
  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;
  wait = false;

  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
      let turnable = e.target.dataset.turnable;

      if (
        !wait &&
        lastKnownButtonId == undefined &&
        lastKnownButtonNumber == undefined &&
        turnable == "true"
      ) {
        executeOnFirstClick(e); //
      }

      //action for second click
      else if (
        !wait &&
        lastKnownButtonId != undefined &&
        lastKnownButtonNumber != undefined &&
        turnable == "true" &&
        e.target.id != lastKnownButtonId
      ) {
        executeOnSecondClick(e);
      }
    });
  }
}

// return correct images by the game selected

function setImageByGameType(gameType, e) {
  switch (gameType) {
    case 1:
      e.target.innerHTML = getgImage(event.target.dataset.number);
      break;
    case 2:
      e.target.innerHTML = getgLetterImage(event.target.dataset.number);
      break;
    case 3:
      e.target.innerHTML = getgPunctuationImage(event.target.dataset.number);
      break;
    default:
      return " ";
  }
}

function executeOnFirstClick(e) {
  e.target.dataset.turnable = "false"; //set turnable false so this card cant be clicked again

  setImageByGameType(gameType, e);
  e.target.style.backgroundColor = "orange"; // change background to orange

  lastKnownButtonId = e.target.id;
  lastKnownButtonNumber = e.target.dataset.number; // save turned card for matching on executeOnSecondClick function
}

function executeOnSecondClick(e) {
  e.target.dataset.turnable = "false"; //set turnable false so this card cant be clicked again

  setImageByGameType(gameType, e);

  if (e.target.dataset.number == lastKnownButtonNumber) {
    executeOnMatch(e);
  } else {
    executeOnMismatch(e);
  }
}

function executeOnMatch(e) {
  e.target.style.backgroundColor = "green"; //set 2nd turned card green background
  document.getElementById(lastKnownButtonId).style.backgroundColor = "green"; // set 1st turned card green background

  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;

  matches++;

  if (matches == 8) {
    showWinScreen(); // when 8 matches show win screen with reset button
  }
}

function executeOnMismatch(e) {
  document.getElementById(lastKnownButtonId).style.backgroundColor = "red"; //set 1st turned card red background
  e.target.style.backgroundColor = "red"; //set 2nd turned card red background
  wait = true;

  //create a delay between clicking on cards 
  setTimeout(() => {
    e.target.dataset.turnable = "true";
    e.target.style.backgroundColor = "white";
    e.target.innerHTML = getgImage(0);

    let tempLastClickedButton = document.getElementById(lastKnownButtonId);

    tempLastClickedButton.dataset.turnable = "true";
    tempLastClickedButton.style.backgroundColor = "white";
    tempLastClickedButton.innerHTML = getgImage(0);

    lastKnownButtonId = undefined;
    lastKnownButtonNumber = undefined;
    wait = false;
  }, 1500);
}

// resets game and asign letters images and sounds

function gameLetters() {
  gameType = 2;
  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;
  wait = false;
  numbers = getRandom(letters, 8);
  shuffle(numbers);
  distributeNumbers(gameType);
  matches = 0;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = getgLetterImage(0);
    buttons[i].style.backgroundColor = "rgba(255, 255, 255, 0.7)";

    document.querySelector(".win-container").style.display = "none";
    document.getElementById("6").style.display = "block";
    document.getElementById("7").style.display = "block";
    document.getElementById("10").style.display = "block";
    document.getElementById("11").style.display = "block";
  }
}

// resets game and asign punctuation images and sounds

function gamePunctuation() {
  gameType = 3;
  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;
  wait = false;
  numbers = getRandom(punctuation, 8);
  shuffle(numbers);
  distributeNumbers(gameType);
  matches = 0;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = getgPunctuationImage(0);
    buttons[i].style.backgroundColor = "rgba(255, 255, 255, 0.7)";

    document.querySelector(".win-container").style.display = "none";
    document.getElementById("6").style.display = "block";
    document.getElementById("7").style.display = "block";
    document.getElementById("10").style.display = "block";
    document.getElementById("11").style.display = "block";
  }
}

// resets game and asign numbers images and sounds

function gameNumbers() {
  gameType = 1;
  lastKnownButtonId = undefined;
  lastKnownButtonNumber = undefined;
  wait = false;
  numbers = getRandom(num, 8);
  shuffle(numbers);
  distributeNumbers(gameType);
  matches = 0;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = getgImage(0);
    buttons[i].style.backgroundColor = "rgba(255, 255, 255, 0.7)";

    document.querySelector(".win-container").style.display = "none";
    document.getElementById("6").style.display = "block";
    document.getElementById("7").style.display = "block";
    document.getElementById("10").style.display = "block";
    document.getElementById("11").style.display = "block";
  }
}

// showWinScreen();

function showWinScreen() {
  document.querySelector(".win-container").style.display = "flex";

  // hide cards to display win screen
  document.getElementById("6").style.display = "none";
  document.getElementById("7").style.display = "none";
  document.getElementById("10").style.display = "none";
  document.getElementById("11").style.display = "none";
}

//will return a string for each number from array with according image for Numbers game

function getgImage(number) {
    let source;
  switch (number) {
    case "0":
      source = '<img src="assets/images/card_0.jpg">';
      break;
    case "1":
      source = '<img src="assets/images/card_1.jpg">';
      break;
    case "2":
      source = '<img src="assets/images/card_2.jpg">';
      break;
    case "3":
      source = '<img src="assets/images/card_3.jpg">';
      break;
    case "4":
      source = '<img src="assets/images/card_4.jpg">';
      break;
    case "5":
      source = '<img src="assets/images/card_5.jpg">';
      break;
    case "6":
      source = '<img src="assets/images/card_6.jpg">';
      break;
    case "7":
      source = '<img src="assets/images/card_7.jpg">';
      break;
    case "8":
      source = '<img src="assets/images/card_8.jpg">';
      break;
    case "9":
      source = '<img src="assets/images/card_9.jpg">';
      break;
    default:
      source = '<img src="assets/images/card_back.jpg">';
  }
  return source;
}

//will return a string for each number from array with according sound for Numbers game

function getSound(number) {
    let source;
  switch (number) {
    case "0":
      source = "playAudio('assets/sounds/0_number_morse_code.mp3')";
      break;
    case "1":
      source = "playAudio('assets/sounds/1_number_morse_code.mp3')";
      break;
    case "2":
      source = "playAudio('assets/sounds/2_number_morse_code.mp3')";
      break;
    case "3":
      source = "playAudio('assets/sounds/3_number_morse_code.mp3')";
      break;
    case "4":
      source = "playAudio('assets/sounds/4_number_morse_code.mp3')";
      break;
    case "5":
      source = "playAudio('assets/sounds/5_number_morse_code.mp3')";
      break;
    case "6":
      source = "playAudio('assets/sounds/6_number_morse_code.mp3')";
      break;
    case "7":
      source = "playAudio('assets/sounds/7_number_morse_code.mp3')";
      break;
    case "8":
      source = "playAudio('assets/sounds/8_number_morse_code.mp3')";
      break;
    case "9":
      source = "playAudio('assets/sounds/9_number_morse_code.mp3')";
      break;
    default:
      source = " ";
  }
  return source;
}

//will return a string for each number from array with according image for Letters game

function getgLetterImage(number) {
    let source;
  switch (number) {
    case "0":
      source = '<img src="assets/images/card_A.jpg">';
      break;
    case "1":
      source = '<img src="assets/images/card_B.jpg">';
      break;
    case "2":
      source = '<img src="assets/images/card_C.jpg">';
      break;
    case "3":
      source = '<img src="assets/images/card_D.jpg">';
      break;
    case "4":
      source = '<img src="assets/images/card_E.jpg">';
      break;
    case "5":
      source = '<img src="assets/images/card_F.jpg">';
      break;
    case "6":
      source = '<img src="assets/images/card_G.jpg">';
      break;
    case "7":
      source = '<img src="assets/images/card_H.jpg">';
      break;
    case "8":
      source = '<img src="assets/images/card_I.jpg">';
      break;
    case "9":
      source = '<img src="assets/images/card_J.jpg">';
      break;
    case "10":
      source = '<img src="assets/images/card_K.jpg">';
      break;
    case "11":
      source = '<img src="assets/images/card_L.jpg">';
      break;
    case "12":
      source = '<img src="assets/images/card_M.jpg">';
      break;
    case "13":
      source = '<img src="assets/images/card_N.jpg">';
      break;
    case "14":
      source = '<img src="assets/images/card_O.jpg">';
      break;
    case "15":
      source = '<img src="assets/images/card_P.jpg">';
      break;
    case "16":
      source = '<img src="assets/images/card_Q.jpg">';
      break;
    case "17":
      source = '<img src="assets/images/card_R.jpg">';
      break;
    case "18":
      source = '<img src="assets/images/card_S.jpg">';
      break;
    case "19":
      source = '<img src="assets/images/card_T.jpg">';
      break;
    case "20":
      source = '<img src="assets/images/card_U.jpg">';
      break;
    case "21":
      source = '<img src="assets/images/card_V.jpg">';
      break;
    case "22":
      source = '<img src="assets/images/card_W.jpg">';
      break;
    case "23":
      source = '<img src="assets/images/card_X.jpg">';
      break;
    case "24":
      source = '<img src="assets/images/card_Y.jpg">';
      break;
    case "25":
      source = '<img src="assets/images/card_Z.jpg">';
      break;
    default:
      source = '<img src="assets/images/card_back.jpg">';
  }
  return source;
}

//will return a string for each number from array with according sound for Letters game

function getLettersSound(number) {
    let source;
  switch (number) {
    case "0":
      source = "playAudio('assets/sounds/A_morse_code.mp3')";
      break;
    case "1":
      source = "playAudio('assets/sounds/B_morse_code.mp3')";
      break;
    case "2":
      source = "playAudio('assets/sounds/C_morse_code.mp3')";
      break;
    case "3":
      source = "playAudio('assets/sounds/D_morse_code.mp3')";
      break;
    case "4":
      source = "playAudio('assets/sounds/E_morse_code.mp3')";
      break;
    case "5":
      source = "playAudio('assets/sounds/F_morse_code.mp3')";
      break;
    case "6":
      source = "playAudio('assets/sounds/G_morse_code.mp3')";
      break;
    case "7":
      source = "playAudio('assets/sounds/H_morse_code.mp3')";
      break;
    case "8":
      source = "playAudio('assets/sounds/I_morse_code.mp3')";
      break;
    case "9":
      source = "playAudio('assets/sounds/J_morse_code.mp3')";
      break;
    case "10":
      source = "playAudio('assets/sounds/K_morse_code.mp3')";
      break;
    case "11":
      source = "playAudio('assets/sounds/L_morse_code.mp3')";
      break;
    case "12":
      source = "playAudio('assets/sounds/M_morse_code.mp3')";
      break;
    case "13":
      source = "playAudio('assets/sounds/N_morse_code.mp3')";
      break;
    case "14":
      source = "playAudio('assets/sounds/O_morse_code.mp3')";
      break;
    case "15":
      source = "playAudio('assets/sounds/P_morse_code.mp3')";
      break;
    case "16":
      source = "playAudio('assets/sounds/Q_morse_code.mp3')";
      break;
    case "17":
      source = "playAudio('assets/sounds/R_morse_code.mp3')";
      break;
    case "18":
      source = "playAudio('assets/sounds/S_morse_code.mp3')";
      break;
    case "19":
      source = "playAudio('assets/sounds/T_morse_code.mp3')";
      break;
    case "20":
      source = "playAudio('assets/sounds/U_morse_code.mp3')";
      break;
    case "21":
      source = "playAudio('assets/sounds/V_morse_code.mp3')";
      break;
    case "22":
      source = "playAudio('assets/sounds/W_morse_code.mp3')";
      break;
    case "23":
      source = "playAudio('assets/sounds/X_morse_code.mp3')";
      break;
    case "24":
      source = "playAudio('assets/sounds/Y_morse_code.mp3')";
      break;
    case "25":
      source = "playAudio('assets/sounds/Z_morse_code.mp3')";
      break;
    default:
      source = " ";
  }
  return source;
}

//will return a string for each number from array with according image for punctuation game

function getgPunctuationImage(number) {
    let source;
  switch (number) {
    case "0":
      source = '<img src="assets/images/card_Ampresand.jpg">';
      break;
    case "1":
      source = '<img src="assets/images/card_Apostrope.jpg">';
      break;
    case "2":
      source = '<img src="assets/images/card_At.jpg">';
      break;
    case "3":
      source = '<img src="assets/images/card_Colon.jpg">';
      break;
    case "4":
      source = '<img src="assets/images/card_Comma.jpg">';
      break;
    case "5":
      source = '<img src="assets/images/card_Dollar.jpg">';
      break;
    case "6":
      source = '<img src="assets/images/card_Equals.jpg">';
      break;
    case "7":
      source = '<img src="assets/images/card_Exclamation.jpg">';
      break;
    case "8":
      source = '<img src="assets/images/card_Hyphen.jpg">';
      break;
    case "9":
      source = '<img src="assets/images/card_ParanthesisClose.jpg">';
      break;
    case "10":
      source = '<img src="assets/images/card_ParanthesisOpen.jpg">';
      break;
    case "11":
      source = '<img src="assets/images/card_Period.jpg">';
      break;
    case "12":
      source = '<img src="assets/images/card_Plus.jpg">';
      break;
    case "13":
      source = '<img src="assets/images/card_Question.jpg">';
      break;
    case "14":
      source = '<img src="assets/images/card_Quotation.jpg">';
      break;
    case "15":
      source = '<img src="assets/images/card_Slash.jpg">';
      break;
    case "16":
      source = '<img src="assets/images/card_Underscore.jpg">';
      break;
    default:
      source = '<img src="assets/images/card_back.jpg">';
  }
  return source;
}

//will return a string for each number from array with according sound for punctuation game

function getPunctuationSound(number) {
    let source;
  switch (number) {
    case "0":
      source = "playAudio('assets/sounds/Morse_Code_-_Ampersand.mp3')";
      break;
    case "1":
      source = "playAudio('assets/sounds/Morse_Code_-_Apostrope.mp3')";
      break;
    case "2":
      source = "playAudio('assets/sounds/Morse_Code_-_At_(Commercial_At).mp3')";
      break;
    case "3":
      source = "playAudio('assets/sounds/Morse_Code_-_Colon.mp3')";
      break;
    case "4":
      source = "playAudio('assets/sounds/Morse_Code_-_Comma.mp3')";
      break;
    case "5":
      source = "playAudio('assets/sounds/Morse_Code_-_Dollar_Sign.mp3')";
      break;
    case "6":
      source = "playAudio('assets/sounds/Morse_Code_-_Equals.mp3')";
      break;
    case "7":
      source = "playAudio('assets/sounds/Morse_Code_-_Exclamation_Point.mp3')";
      break;
    case "8":
      source = "playAudio('assets/sounds/Morse_Code_-_Hyphen,_Minus.mp3')";
      break;
    case "9":
      source = "playAudio('assets/sounds/Morse_Code_-_Parenthesis_(Close).mp3')";
      break;
    case "10":
      source = "playAudio('assets/sounds/Morse_Code_-_Parenthesis_(Open).mp3')";
      break;
    case "11":
      source = "playAudio('assets/sounds/Morse_Code_-_Period.mp3')";
      break;
    case "12":
      source = "playAudio('assets/sounds/Morse_Code_-_Plus.mp3')";
      break;
    case "13":
      source = "playAudio('assets/sounds/Morse_Code_-_Question_Mark.mp3')";
      break;
    case "14":
      source = "playAudio('assets/sounds/Morse_Code_-_Quotation_Mark.mp3')";
      break;
    case "15":
      source = "playAudio('assets/sounds/Morse_Code_-_Slash.mp3')";
      break;
    case "16":
      source = "playAudio('assets/sounds/Morse_Code_-_Underscore.mp3')";
      break;
    default:
      source = " ";
  }
  return source;
}

function mute() {
  playSound = false;
}

function unMute() {
  playSound = true;
}

function delaySound(url) {
    if (sound == true) {
        sound = false;
        new Audio(url).play();
        setTimeout(() => {
            sound = true;
        }, 1000);
        
    }
}

function playAudio(url) {
  if (playSound == true) {
    delaySound(url);
  } else {
    playSound = false;
  }
}

//set the sound and images for each card by gametype

function distributeNumbers(gameType) {
  if (gameType == 1) {
    for (i = 0; i < buttons.length; i++) {
      buttons[i].dataset.number = numbers[i];
      buttons[i].dataset.turnable = "true"; // change to true so card can be turned again
      buttons[i].setAttribute("onclick", getSound(buttons[i].dataset.number)); // assign sounds to each card
    }
  } else if (gameType == 2) {
    for (i = 0; i < buttons.length; i++) {
      buttons[i].dataset.number = numbers[i];
      buttons[i].dataset.turnable = "true"; // change to true so card can be turned again
      buttons[i].setAttribute(
        "onclick",
        getLettersSound(buttons[i].dataset.number)); // assign sounds to each card
    }
  } else if (gameType == 3) {
    for (i = 0; i < buttons.length; i++) {
      buttons[i].dataset.number = numbers[i];
      buttons[i].dataset.turnable = "true"; // change to true so card can be turned again
      buttons[i].setAttribute(
        "onclick",
        getPunctuationSound(buttons[i].dataset.number)); // assign sounds to each card
    }
  }
}

//get random 8 numbers from an array

function getRandom(arr, n) {
  let m = n * 2;
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  //create new array with double the size of initial array
  let i,
    j = 0;
  let resultDouble = new Array(m);
  for (i = 0; i < result.length; i++) {
    resultDouble[j] = result[i];
    resultDouble[j + 1] = result[i];
    j = j + 2;
  }
  return resultDouble;
}

//shuffle the array
function shuffle(array) {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}
