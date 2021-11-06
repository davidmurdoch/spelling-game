const audio = new Audio("./img/complete.mp3");
const quips = [
  `By the way, you look amazing today!`,
  `You're doing great! Keep going!`,
  `Nicely done!`,
  `I have a joke for you: What do you call a cute donut? Uh dough able!`,
  "I have a joke for you: Why did the student eat his homework? Because it the teacher said it was a piece of cake!",
  "I have a joke for you: Why was 6 afraid of 7? Because seven eight nine!",
  "What do you call a boomerang that won’t come back? A stick.",
  "I have a joke for you: What do you get when you put 3 ducks in a box? A box of quakers!",
  "How do we know that the ocean is friendly? It waves."
];
const words = [
  ["weary", "He was weary from the rainy day"],
  ["perfect", "The pizza bones were perfect"],
  ["career", "I'd like to have a career in having fun."],
  ["circle", "Our house is not a circle."],
  ["study", "I should study spelling"],
  ["compare", "Compare your cheese and shoes."],
  ["fourth", "I am in the fourth grade."],
  ["during", "I slept during class"],
  ["library", "The bear was in the library"],
  ["heard", "I heard the bear eat the teacher."],
  ["appeared", "The bear appeared to be very hungry."],
  ["squirming", "The worm was squirming in my mouth."],
  ["purr", "The cat liked to purr."],
  ["journal", "I have a journal for spelling."],
  ["herd", "Olivia ran with a herd of horses."],
  ["perhaps", "Perhaps you can fly. Have you tried?"],
  ["searches", "He searches high and low but never finds his toe."],
  ["servant", "The servant loves ants."],
  ["steer", "The captain in Hawaii let me steer the boat."],
  ["journey", "I would like to go on a journey into space with you."],
];

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

  const w = inputDiv.value.toLowerCase().trim();
  if (!w) return;
  if (w === word[0]) {
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
    pauseForm = true;
    setTimeout(() => {
      pauseForm = false;
    }, 2000);
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
    const d = parseInt(document.getElementById("difficultyLevelInput").value);
    difficultyLevel = isNaN(d) ? difficultyLevel : d;
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

  let dividend = 2;
  if (words.length > 15) {
    dividend = 3;
  }
  if (lastWord != 0 && lastWord % Math.floor(words.length / dividend) === 0) {
    const indexa = Math.floor(Math.random() * quips.length);
    const quip = quips[indexa];
    const utterancea = new SpeechSynthesisUtterance(quip);
    speechSynthesis.speak(utterancea);
  }

  document.getElementById("photo").src = "./img/words/" + word[0] + ".jpg";

  lastWord++;

  const utterance = new SpeechSynthesisUtterance(`Spell the word, ${word[0]}.`);
  speechSynthesis.speak(utterance);
  const utterance2 = new SpeechSynthesisUtterance(word[1]);
  utterance2.rate = 1.2;
  speechSynthesis.speak(utterance2);
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
