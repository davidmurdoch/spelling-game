let numWords = localStorage.getItem("numWords") == undefined ? 20 : localStorage.getItem("numWords");
let chatty = localStorage.getItem("talkative") === "false" ? false : true;
let difficultyLevel = localStorage.getItem("difficultyLevel") == undefined ? 0 : localStorage.getItem("difficultyLevel");

let bgColor = localStorage.getItem("bgColor") === undefined ? "green" : localStorage.getItem("bgColor");

document.getElementById("numWords").value = numWords;
document.getElementById("difficultyLevelInput").value = difficultyLevel;
document.getElementById("talkativeInput").checked = chatty;
document.getElementById("bgColor").value = bgColor;


function setBgColor(color){
  document.getElementById("start").style.backgroundColor = color;
  document.body.style.backgroundColor = color;
}
setBgColor(bgColor);

document.getElementById("talkativeInput").addEventListener("change", () => {
  chatty = document.getElementById("talkativeInput").checked;
  localStorage.setItem("talkative", chatty);
});

const audio = new Audio("./img/complete.mp3");
const quips = [
  `By the way, you look amazing today!`,
  `You're doing great! Keep going!`,
  `Nicely done!`,
  `I have a joke for you: What do you call a cute donut? Uh dough able!`,
  "I have a joke for you: Why did the student eat his homework? Because it the teacher said it was a piece of cake!",
  "I have a joke for you: Why was 6 afraid of 7? Because seven eight nine!",
  "What do you call a boomerang that won't come back? A stick.",
  "I have a joke for you: What do you get when you put 3 ducks in a box? A box of quackers!",
  "How do we know that the ocean is friendly? It waves.",
  "Why did the toddler toss the butter out the window? So she could see a butter-fly.",
  "Why couldn't the pony sing a lullaby? She was a little horse.",
  "What candy do bumblebees love the most? Bumble gum!"
];
const _words = [
  // Nora
  ["front", "Nora sits in the front of the classroom."],
  // Maria
  ["double", "Double Maria's points."],
  // Grace
  ["money", "Give Grace some money!"],
  // Olivia
  ["country", "Olivia is from the country."],
  // V.V.
  ["month", "I don't think V.V's birthday is in the month of January."],
  // Riker
  ["young", "Riker is young compared to his brother."],
  // Eliana
  ["wonder", "Eliana's story made me wonder."],
  // Miles
  ["touchdown", "Miles scored a touchdown."],
  // Luca
  ["dozen", "Luca ate a dozen cookies."],
  // Claire
  ["cover", "Claire covered herself in a blanket."],
  // Natalia
  ["couple", "A couple of spiders made Natalia's hair stand up."],
  // Olivia
  ["monkey", "Olivia's monkey is a monkey."],
  // Luke
  ["rough", "Luke had a rough day."],
  // Cadence
  ["tough", "Cadence is tough."],
  // G.G.
  ["shovel", "The shovel has a G.G. in it."],
  // Josiah
  ["cousin", "Josiah's cousin really has some big teeth."],

  // Mackenzie
  ["designing", "Mackenzie is designing a new website."],
  // Lidia
  ["hymn", "Lidia sang a hymn."],

  // Lincoln
  ["among", "Lincoln is among the most popular people in the world."],
  // Gracelyn and Mrs. RIchardson
  ["company", "Gracelyn and Mrs. Richardson are in the same company."],
];
let words = [];

let word;
let lastWord = 0;


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
  if (w === word[0].toLowerCase()) {
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
    localStorage.setItem("difficultyLevel", difficultyLevel);

    draw(word);
  });

  document
  .getElementById("bgColor")
  .addEventListener("change", () => {
    bgColor = document.getElementById("bgColor").value
    setBgColor(bgColor);
    localStorage.setItem("bgColor", bgColor);
  });

  document
  .getElementById("numWords")
  .addEventListener("change", () => {
    const d = parseInt(document.getElementById("numWords").value);
    numWords = isNaN(d) ? numWords : d;
    numWords = Math.min(numWords, 20);
    numWords = Math.max(numWords, 0);
    document.getElementById("numWords").value = numWords;
    localStorage.setItem("numWords", numWords);

    startOver();
  });

function begin() {
  lastWord = 0;
  word = null;
  document.getElementById("sprite").style.left = 0;
  let tempWords = [..._words];
  tempWords = tempWords.sort(() => {
    return Math.random() < 0.5 ? -1 : 1;
  });
  let repeatTimes = (_words.length / Math.floor(numWords));
  tempWords = tempWords.slice(0, numWords);
  words = [];
  for (let i = 0; i < repeatTimes; i++) {
    for (let j = 0; j < tempWords.length; j++) {
      words.push(tempWords[j]);
    }
  }
  
  start();
}

const startOver = (e) => {
  e && e.preventDefault();
  begin();
  document.getElementById("won").style.display = "none";
  document.getElementById("app").style.display = "block";
}
document.getElementById("start-over").addEventListener("click", startOver);
document.getElementById("start-over-link").addEventListener("click", startOver);


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
  if (chatty) {
    if (lastWord != 0 && lastWord % Math.floor(words.length / dividend) === 0) {
      const indexa = Math.floor(Math.random() * quips.length);
      const quip = quips[indexa];
      const utterancea = new SpeechSynthesisUtterance(quip);
      speechSynthesis.speak(utterancea);
    }
  }

  document.getElementById("photo").src = "./img/words/" + word[0] + ".jpg";

  lastWord++;

  const utterance = new SpeechSynthesisUtterance(`Spell the word, ${word[0]}.`);
  speechSynthesis.speak(utterance);
  if (chatty) {
    const utterance2 = new SpeechSynthesisUtterance(word[1]);
    utterance2.rate = 1.2;
    speechSynthesis.speak(utterance2);
  }
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
