const data = [
  {
    text: "Fungují počítače na 0 a 1 neboli binární soustavě?",
    answar: true,
    choses: "Napiš True nebo False"
  },
  {
    text: "Jaký je rozdíl mezi malwarem a virem",
    answar: "c",
    choses: "a: malware je nebezpečnější než vir, b: vir je nebezpečnější než malware, c: malware je slovo nadřazené viru"
  },
  {
    text: "Application Programming Interface(API) je programovací jazyk",
    answar: false,
    choses: "True nebo False"
  },
  {
    text: "Python rozeznává 9 ZÁKLADNÍCH datových typů: str, int, float, dict, list, set, tuple, set a None",
    answar: true,
    choses: "True nebo False"
  },
  {
    text: "Jsou HTML a CSS programovací jazyky?",
    answar: false,
    choses: "True nebo False"
  },
  {
    text: "Artifical Intelligence(AI) funguje díky:",
    answar: "b",
    choses: "a: Umí myslet, b: Přijímá hodně dat, které analyzuje a hledá v nich souvislosti, c: Za Ai se nachází skutečný člověk"
  },
  {
    text: "Co je nejdůležitější software v PC?",
    answar: "a",
    choses: "a: operační systém, b: pruzkumník souborů, c: terminál"
  },
  {
    text: "Je class obecný předpis?",
    answar: true,
    choses: "True nebo False"
  },
  {
    text: "Programovací jazyky jsou prostředek pro komunikaci s počítačem",
    answar: true,
    choses: "True nebo False"
  }
];

let currentIndex = 0;
let lives = 1;
let startTime = Date.now();
const timeLimit = 500000; // 500 sekund v ms

const hackMessages = [
  "Probíhá nabourání do první obraného štítu Řídícího centra",
  "Nabourávám...",
  "První štít překonán. Zahajuji překročení druhého štítu podezření: 0 %",
  "Nabourávám",
  "Bourání proběhlo neuspěšně. Zahajuji druhý pokus",
  "Nabourání úspěšné 2. obraný štít překonán",
  "Zahajuji proces vypnutí",
  "Nabourání do řídícího panelu",
  "Zkouším hesla...",
  "Panel byl hacknut, Vypínám řídící centrum\nVšechny systémy byly vypnuty zásadní indexy města byly schozeny na 0!"
];

function displayQuestion() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const remainingTime = Math.floor(timeLimit / 1000) - elapsedTime;

  if (elapsedTime >= timeLimit / 1000) {
    endGame("Vypršel čas! Roboti tě chytili!");
    return;
  }

  if (lives <= 0) {
    endGame("Roboti tě našli a uvěznili. Prohrál jsi!");
    return;
  }

  if (currentIndex >= data.length) {
    endGame("Gratuluji dokázel jsi hacknout celé město a deaktivoval jsi řídící Umělou inteligenci, nyní můžeš opustit město");
    return;
  }

  const question = data[currentIndex];
  const gameContainer = document.getElementById("gameContainer");

  gameContainer.innerHTML = `
    <div class="game-content">
      <div class="timer">⏱️ Zbývající čas: ${remainingTime}s</div>
      <div class="lives">❤️ Životy: ${lives}</div>
      <div class="question-number">Otázka ${currentIndex + 1}/${data.length}</div>
      
      <div class="question-box">
        <h2>${question.text}</h2>
        <p class="choices-label">${question.choses}</p>
        <input 
          type="text" 
          id="answerInput" 
          placeholder="Zadej odpověď..."
          onkeypress="if(event.key === 'Enter') submitAnswer()"
        />
        <button onclick="submitAnswer()" class="submit-btn">ODPOVĚZ</button>
      </div>

      <div class="hack-message">
        <p>${hackMessages[currentIndex]}</p>
      </div>
    </div>
  `;

  document.getElementById("answerInput").focus();
}

function submitAnswer() {
  const question = data[currentIndex];
  let answer = document.getElementById("answerInput").value;

  if (!answer) {
    alert("Prosím zadej odpověď!");
    return;
  }

  // Zpracování odpovědi
  if (question.answar === true || question.answar === false) {
    answer = answer.toLowerCase();
    answer = answer === "true" || answer === "ano" || answer === "1";
  } else {
    answer = answer.toLowerCase();
  }

  const gameContainer = document.getElementById("gameContainer");

  if (answer === question.answar || (typeof question.answar === "string" && answer === question.answar.toLowerCase())) {
    gameContainer.innerHTML += `
      <div class="result-message correct-answer">
        ✅ To je správně!
      </div>
    `;
  } else {
    lives--;
    gameContainer.innerHTML += `
      <div class="result-message wrong-answer">
        ❌ Toto není správná odpověď!<br>Měj se na pozoru zbývá ti ${lives} ${lives === 1 ? "život" : "životy"}!
      </div>
    `;
  }

  setTimeout(() => {
    currentIndex++;
    displayQuestion();
  }, 2000);
}

function endGame(message) {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = `
    <div class="game-over">
      <h1>${message}</h1>
      <button onclick="location.reload()" class="restart-btn">HRÁT ZNOVU</button>
    </div>
  `;
}

// Spusť hru na načtení stránky
window.onload = () => {
  console.log("Proto aby jsi se mohl dostat z města budeš muset odpovědět pár otázek");
  displayQuestion();
};
