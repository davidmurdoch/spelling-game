const quips = [
  `By the way, you look amazing today!`,
  `You're doing great! Keep going!`,
  `Nicely done! You're half way there!`,
  `I have a joke for you: What do you call a cute donut? Uh dough able!`,
  "I have a joke for you: Why did the student eat his homework? Because it the teacher said it was piece of cake!",
  "I have a joke for you: Why was 6 afraid of 7? Because seven eight nine!",
];
const words = [
  "kept",
  "speech",
  "breath",
  "breathe",
  "hello",
  "reason",
  "squeeze",
  "else",
  "lesson",
  "meant",
  "sweater",
  "freedom",
  "repeat",
  "wealth",
  "length",
  "leather",
  "waste",
  "master",
  "a lot",
  "all right",
];
// const words = [
//   "it",
//   "the",
//   "mother",
//   "to",
//   "here",
//   "blue"
// ];
let difficultyLevel = 0;
const length = words.length;
let word;
const lettersDiv = document.getElementById("letters");
const speakButton = document.getElementById("speakButton");
const inputDiv = document.getElementById("input");
const form = document.getElementById("form");
let pauseForm = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pauseForm) return;

  if (inputDiv.value.toLowerCase().trim() === word) {
    pauseForm = true;
    const utterance = new SpeechSynthesisUtterance("Correct!");
    speechSynthesis.speak(utterance);
    setTimeout(() => {
      document.getElementById("sprite").style.left =
        100 * (lastWord / words.length) + "%";
      document.getElementById("sprite").src = "./img/princess.gif";
      setTimeout(() => {
        document.getElementById("sprite").src = "./img/princess-paused.png";
        pauseForm = false;
        start();
      }, 1000);
    });
  } else {
    const utterance = new SpeechSynthesisUtterance("Incorrect");
    speechSynthesis.speak(utterance);
  }
});

speakButton.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.6;

  speechSynthesis.speak(utterance);
  inputDiv.focus();
});
const nextWord = document.getElementById("nextWord");
nextWord.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("sprite").src = "./img/princess.gif";
  start();
});

lettersDiv.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.className === "letter") {
    let letter = e.target.innerHTML;
    if (letter === "&nbsp;") {
      letter = " ";
    }
    inputDiv.value += letter;

    if (letter === " ") {
      letter = "space";
    }
    const utterance = new SpeechSynthesisUtterance(letter);
    speechSynthesis.speak(utterance);

    inputDiv.focus();
  }
});
document
  .getElementById("difficultyLevelInput")
  .addEventListener("change", () => {
    difficultyLevel =
      parseInt(document.getElementById("difficultyLevelInput").value) ||
      difficultyLevel;
    difficultyLevel = Math.min(difficultyLevel, 9);
    difficultyLevel = Math.max(difficultyLevel, 0);
    document.getElementById("difficultyLevelInput").value = difficultyLevel;
  });
let lastWord = 0;
words.sort(() => {
  return Math.random() < 0.5 ? -1 : 1;
});

function start() {
  word = words[lastWord];

  if (lastWord == words.length) {
    document.body.innerHTML =
      "<div id='won'><h1 style='font-size:7em;color:white;'>YOU WON!</h1><img src='./img/toad.gif' style='max-height:90%;max-width:50%' /></div>";
    return;
  }

  lastWord++;

  let letters = [];
  const extras = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  while (extras.length < difficultyLevel) {
    const index = Math.floor(Math.random() * alphabet.length);
    const letter = alphabet[index];
    if (!word.toLowerCase().includes(letter.toLowerCase())) {
      extras.push(letter);
    }
  }
  letters.push(...extras);
  letters.push(...word.toUpperCase().split(""));
  do {
    letters = letters.sort(() => {
      return Math.random() < 0.5 ? -1 : 1;
    });
  } while (letters.join("").toLowerCase().includes(word));

  lettersDiv.innerHTML = "";
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    if (letter === " ") {
      letter = "&nbsp;";
    }
    lettersDiv.innerHTML += `<button class="letter">${letter}</button>`;
  }
  inputDiv.value = "";

  if (lastWord == Math.floor(words.length / 2)) {
    const indexa = Math.floor(Math.random() * quips.length);
    const quip = quips[indexa];
    const utterancea = new SpeechSynthesisUtterance(quip);
    speechSynthesis.speak(utterancea);
  }
  const utterance = new SpeechSynthesisUtterance(`Spell the word, ${word}.`);
  speechSynthesis.speak(utterance);
  inputDiv.focus();
}
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("start").style.display = "none";
  start();
});
