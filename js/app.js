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
  "all right"
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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputDiv.value.toLowerCase().trim() === word) {
    const utterance = new SpeechSynthesisUtterance("Correct!");
    speechSynthesis.speak(utterance);
    setTimeout(() => {
      start();
    }, 1000);
  } else {
    const utterance = new SpeechSynthesisUtterance("Incorrect");
    speechSynthesis.speak(utterance);
  }
});

speakButton.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = .6;

  speechSynthesis.speak(utterance);
  inputDiv.focus();
});
const nextWord = document.getElementById("nextWord");
nextWord.addEventListener("click", (e) => {
  e.preventDefault();
  start();
})

lettersDiv.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.className === "letter") {
    let letter = e.target.innerHTML;
    if (letter === "&nbsp;"){
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
document.getElementById("difficultyLevelInput").addEventListener("change", () => {
  difficultyLevel = parseInt(document.getElementById("difficultyLevelInput").value) || difficultyLevel;
  document.getElementById("difficultyLevelInput").value = difficultyLevel;
})

function start(){
  const lastWord = word;
  do {
    const index = Math.floor(Math.random() * (length));
    word = words[index];
  } while(lastWord === word)

  let letters = [];
  const extras = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  while(extras.length < difficultyLevel) {
    const index = Math.floor(Math.random() * (alphabet.length));
    const letter = alphabet[index]
    if (!word.includes(letter)){
      extras.push(letter);
    }
  }
  letters.push(...extras);
  letters.push(...word.toUpperCase().split(""));
  do {
    letters = letters.sort(() => {
      return Math.random() < .5 ? -1 : 1;
    });
  } while(letters.join("").toLowerCase().includes(word))

  lettersDiv.innerHTML = "";
  for (let i = 0; i < letters.length; i++){
    let letter = letters[i];
    if(letter === " "){
      letter = "&nbsp;";
    }
    lettersDiv.innerHTML += `<button class="letter">${letter}</button>`;
  }
  inputDiv.value = "";

  const utterance = new SpeechSynthesisUtterance(`Spell the word, ${word}.`);
  speechSynthesis.speak(utterance);
  inputDiv.focus();
}
start();