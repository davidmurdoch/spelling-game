const audio = new Audio("./img/complete.mp3");
const quips = [
  `By the way, you look amazing today!`,
  `You're doing great! Keep going!`,
  `Nicely done! You're half way there!`,
  `I have a joke for you: What do you call a cute donut? Uh dough able!`,
  "I have a joke for you: Why did the student eat his homework? Because it the teacher said it was a piece of cake!",
  "I have a joke for you: Why was 6 afraid of 7? Because seven eight nine!",
];
const words = [
  ["size", "What size shoe do you wear?"],
  ["visit", "I love to visit Hawaiʻi in the summer."],
  ["polite", "He is always polite to everyone."],
  ["deny", "No one could deny that Jemma is super cute."],
  ["pride", "Take pride in your work."],
  ["style", "I like her style!"],
  ["finger", "Her finger smelled like dirt."],
  ["delight", "Visiting Hawaiʻi was a delight."],
  ["wildlife", "Hawaiʻi doesn't have much wildlife."],
  ["drive", "You can't drive to Hawaiʻi."],
  ["liquid", "Mercury is a metal that is liquid a room temperature."],
  ["kitchen", "You will find the milk in the kitchen."],
  ["pilot", "The pilot let me sit in the cockpit."],
  ["twilight", "Twilight in Hawaiʻi is very beautiful."],
  ["rely", "In Hawaiʻi, they rely on fish for their food."],
  ["type", "Mexican is my favorite type of food."],
  ["breath", "I watched a turtle surface to take a breath of air in Hawaiʻi"],
  ["reason", "For some reason, I jumped off a cliff in Hawaiʻi."],
  ["inning", "She hit a double in the fourth inning."],
  ["surprise", "I like to surprise my sister with gifts."],
];
// const words = [
//   "it",
//   "the",
//   "mother",
//   "to",
//   "here",
//   "blue"
// ];

let word;
let lastWord = 0;

let difficultyLevel = 0;
const length = words.length;
const lettersDiv = document.getElementById("letters");
const speakButton = document.getElementById("speakButton");
const inputDiv = document.getElementById("input");
const form = document.getElementById("form");
let pauseForm = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pauseForm) return;

  if (inputDiv.value.toLowerCase().trim() === word[0]) {
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
  const utterance = new SpeechSynthesisUtterance(word[0]);
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
    difficultyLevel = Math.min(difficultyLevel, 5);
    difficultyLevel = Math.max(difficultyLevel, 0);
    document.getElementById("difficultyLevelInput").value = difficultyLevel;

    draw(word);
  });

function begin() {
  lastWord = 0;
  word = null;
  document.getElementById("sprite").style.left = 0;
  words.sort(() => {
    return Math.random() < 0.5 ? -1 : 1;
  });
  start();
}

document.getElementById("start-over").addEventListener("click", (e) => {
  e.preventDefault();
  begin();
  document.getElementById("won").style.display = "none";
  document.getElementById("app").style.display = "block";
});

function start() {
  word = words[lastWord];

  if (lastWord == words.length) {
    audio.play();
    document.getElementById("won").style.display = "block";
    document.getElementById("app").style.display = "none";
    return;
  }

  draw(word);

  if (lastWord == Math.floor(words.length / 2)) {
    const indexa = Math.floor(Math.random() * quips.length);
    const quip = quips[indexa];
    const utterancea = new SpeechSynthesisUtterance(quip);
    speechSynthesis.speak(utterancea);
  }

  document.getElementById("photo").src = "./img/words/" + word[0] + ".jpg";

  lastWord++;

  const utterance = new SpeechSynthesisUtterance(
    `Spell the word, ${word[0]}. ${word[1]}`
  );
  speechSynthesis.speak(utterance);
  inputDiv.focus();
}
function draw(word) {
  let letters = [];
  const extras = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  if (difficultyLevel < 5) {
    while (extras.length < difficultyLevel) {
      const index = Math.floor(Math.random() * alphabet.length);
      const letter = alphabet[index];
      if (!word[0].toLowerCase().includes(letter.toLowerCase())) {
        extras.push(letter);
      }
    }
    letters.push(...extras);
    letters.push(...word[0].toUpperCase().split(""));
  }
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
}
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("start").style.display = "none";
  begin();
});
