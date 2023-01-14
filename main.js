// Array of words
let words = [
  "Hello",
  "Programming",
  "Abdulrahman ali",
  "workout",
  "today",
  "ther",
  "Mountain",
  "flex-box",
  "The world",
  "Hard Work",
  "Bussiness Man",
  "new year",
  "scary",
  "Escap Plan",
  "moukly",
];

// get words count
let wordsCount = words.length;

// set levels

let lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};

// Defult level
let defultLvlName = "Normal";
let defultLvlSeconds = lvls[defultLvlName];

// select elements from html
let lvlSpan = document.querySelector(".lvl span");
let secondsSpan = document.querySelector(".seconds span");
let scoreDiv = document.querySelector(".score");
let timeDiv = document.querySelector(".controll .time");
let upcomingWordsDiv = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let theGivenWord = document.querySelector(".the-word");
let startButton = document.querySelector(".start");
let finishedDiv = document.querySelector(".finished");
let timeLeftSpan = document.querySelector(".controll .time span");
let gotScoreSpan = document.querySelector(".controll .score .got");
let totalScoreSpan = document.querySelector(".controll .score .total");

// setting level + score + seconds
lvlSpan.innerHTML = defultLvlName;
console.log(lvlSpan);
secondsSpan.innerHTML = `00:0${defultLvlSeconds}`;
gotScoreSpan.innerHTML = 0;
totalScoreSpan.innerHTML = words.length;
timeLeftSpan.innerHTML = defultLvlSeconds;
console.log(gotScoreSpan.innerHTML);

// Disaple paste Event
input.onpaste = function () {
  return false;
};

// start Game
startButton.onclick = function () {
  //remove the button
  this.remove();
  // focus on input when clicking
  input.style.display = "block";
  input.focus();

  // Generate Word Function
  genWords();
};

function genWords() {
  // generate random word
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get wrod index
  let wordIndex = words.indexOf(randomWord);

  // remove the word from array of words
  words.splice(wordIndex, 1);

  // Show generated word to user
  theGivenWord.innerHTML = randomWord;
  // empty upcomming word
  upcomingWordsDiv.innerHTML = "";

  // create upcomming words
  for (let i = 0; i < words.length; i++) {
    // create div
    let div = document.createElement("div");
    // put the random word inside the div
    let divWord = document.createTextNode(words[i]);
    //append txt
    div.append(divWord);
    //append to upcomingwords div
    upcomingWordsDiv.appendChild(div);
  }

  // call start play function
  startPlay();
}
//loop on words to get if this is the first word
// if (words.indexOf(words) = 0) {
// }
function startPlay() {
  //reset time
  timeLeftSpan.innerHTML = defultLvlSeconds;
  //
  if (gotScoreSpan.innerHTML == 0) {
    timeLeftSpan.innerHTML = defultLvlSeconds * 2;c
  }

  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    // console.log(timeLeftSpan.innerHTML--);
    if (timeLeftSpan.innerHTML === "0") {
      //stop tiemr
      clearInterval(start);

      // check if the wrod ios right
      if (theGivenWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
        input.value = "";

        gotScoreSpan.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          finishedDiv.style.display = "inline";
          let span = document.createElement("span");
          let spanText = document.createTextNode("Congratulation");
          span.append(spanText);
          span.className = "good";
          finishedDiv.appendChild(span);
          let score = document.createElement("div");
          let scoreDiv = document.createTextNode(
            `Your Score Is ${gotScoreSpan.innerHTML} from ${wordsCount}`
          );
          score.append(scoreDiv);
          finishedDiv.appendChild(score);
        }
      } else {
        finishedDiv.style.display = "inline";
        let span = document.createElement("span");
        let spanText = document.createTextNode(`Game Over`);
        span.append(spanText);
        span.className = "bad";
        finishedDiv.appendChild(span);
        let score = document.createElement("div");
        let scoreDiv = document.createTextNode(
          `Your Score Is ${gotScoreSpan.innerHTML} from ${wordsCount}`
        );
        score.append(scoreDiv);
        finishedDiv.appendChild(score);
      }
    }
  }, 1000);
}
