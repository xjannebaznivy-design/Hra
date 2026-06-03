const data = [
  {
    text: "Fungují počítače na 0 a 1 neboli binární soustavě?",
    answer: true,
    choses: "Napiš True nebo False"
  },
  {
    text: "Jaký je rozdíl mezi malwarem a virem",
    answer: "c",
    choses: "a: malware je nebezpečnější než vir, b: vir je nebezpečnější než malware, c: malware je slovo nadřazené viru"
  },
  {
    text: "Application Programming Interface(API) je programovací jazyk",
    answer: false,
    choses: "True nebo False"
  },
  {
    text: "Python rozeznává 9 ZÁKLADNÍCH datových typů: str, int, float, dict, list, set, tuple, set a None",
    answer: true,
    choses: "True nebo False"
  },
  {
    text: "Jsou HTML a CSS programovací jazyky?",
    answer: false,
    choses: "True nebo False"
  },
  {
    text: "Artifical Intelligence(AI) funguje díky:",
    answer: "b",
    choses: "a: Umí myslet, b: Přijímá hodně dat, které analyzuje a hledá v nich souvislosti, c: Za Ai se nachází skutečný člověk"
  },
  {
    text: "Co je nejdůležitější software v PC?",
    answer: "a",
    choses: "a: operační systém, b: pruzkumník souborů, c: terminál"
  },
  {
    text: "Je class obecný předpis?",
    answer: true,
    choses: "True nebo False"
  },
  {
    text: "Programovací jazyky jsou prostředek pro komunikaci s počítačem",
    answer: true,
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

function addLineToTerminal(text, className = 'output-line') {
  const content = document.getElementById('terminalContent');
  const line = document.createElement('div');
  line.className = `line ${className}`;
  line.textContent = text;
  content.appendChild(line);
  
  // Zvuk psaní
  playTypeSound();
  
  // Auto-scroll na konec
  setTimeout(() => {
    content.scrollTop = content.scrollHeight;
  }, 0);
}

function displayTerminalQuestion() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const remainingTime = Math.floor(timeLimit / 1000) - elapsedTime;

  if (elapsedTime >= timeLimit / 1000) {
    endTerminalGame("Vypršel čas! Roboti tě chytili!");
    return;
  }

  if (lives <= 0) {
    endTerminalGame("Roboti tě našli a uvěznili. Prohrál jsi!");
    return;
  }

  if (currentIndex >= data.length) {
    endTerminalGame("Gratuluji! Dokázel jsi hacknout celé město a deaktivoval jsi řídící Umělou inteligenci, nyní můžeš opustit město.");
    return;
  }

  const question = data[currentIndex];
  const content = document.getElementById('terminalContent');

  // Vymaž obsah a začni nanovo
  if (currentIndex === 0) {
    content.innerHTML = '';
    addLineToTerminal('$ ./system.out', 'output-line');
    addLineToTerminal('Connecting...', 'output-line');
    addLineToTerminal('Connection established to [CITY_CORE]', 'output-line');
    addLineToTerminal('', 'output-line');
  }

  // Zobraz hack message
  addLineToTerminal(`$ echo "${hackMessages[currentIndex]}"`, 'command-line');
  addLineToTerminal(hackMessages[currentIndex], 'output-line');
  addLineToTerminal('', 'output-line');

  // Zobraz čas a životy
  addLineToTerminal(`⏱️  Čas: ${remainingTime}s | ❤️  Životů: ${lives}`, 'timer-line');
  addLineToTerminal('', 'output-line');

  // Zobraz otázku
  addLineToTerminal(`[Otázka ${currentIndex + 1}/${data.length}]`, 'timer-line');
  addLineToTerminal(`$ ask "${question.text}"`, 'command-line');
  addLineToTerminal(`> ${question.text}`, 'question-line');
  addLineToTerminal(`(${question.choses})`, 'output-line');
  addLineToTerminal('', 'output-line');
  addLineToTerminal('$ answer ', 'command-line');

  // Focus na input
  const input = document.getElementById('terminalInput');
  input.value = '';
  input.focus();
}

function submitTerminalAnswer() {
  const question = data[currentIndex];
  let answer = document.getElementById('terminalInput').value;

  if (!answer) {
    addLineToTerminal('ERROR: Odpověď nelze ponechat prázdnou!', 'error-line');
    playWrongSound();
    return;
  }

  // Zobraz zadanou odpověď
  addLineToTerminal(answer, 'command-line');
  addLineToTerminal('', 'output-line');

  // Zpracování odpovědi
  if (question.answer === true || question.answer === false) {
    answer = answer.toLowerCase();
    answer = answer === "true" || answer === "ano" || answer === "1";
  } else {
    answer = answer.toLowerCase();
  }

  const isCorrect = answer === question.answer || (typeof question.answer === "string" && answer === question.answer.toLowerCase());

  if (isCorrect) {
    playCorrectSound();
    addLineToTerminal('✅ [ACCESS_GRANTED] Správná odpověď!', 'success-line');
    addLineToTerminal('Systém se připravuje na další otázku...', 'output-line');
  } else {
    playWrongSound();
    lives--;
    addLineToTerminal('❌ [ACCESS_DENIED] Špatná odpověď!', 'error-line');
    addLineToTerminal(`Zbývá ti ${lives} ${lives === 1 ? "život" : "životů"}!`, 'error-line');
  }

  addLineToTerminal('', 'output-line');

  setTimeout(() => {
    currentIndex++;
    displayTerminalQuestion();
  }, 2500);
}

function endTerminalGame(message) {
  const content = document.getElementById('terminalContent');
  const terminal = document.getElementById('terminal');

  playGameOverSound();

  addLineToTerminal('', 'output-line');
  addLineToTerminal('═══════════════════════════════════════', 'output-line');
  addLineToTerminal(message, message.includes('Gratuluji') ? 'success-line' : 'error-line');
  addLineToTerminal('═══════════════════════════════════════', 'output-line');
  addLineToTerminal('', 'output-line');
  addLineToTerminal('$ system.shutdown()', 'command-line');

  // Skryj input a přidej restart tlačítko
  setTimeout(() => {
    const inputLine = document.querySelector('.terminal-input');
    inputLine.innerHTML = '<button class="restart-btn" onclick="location.reload()">⟳ RESTART</button>';
  }, 1000);
}

// Spusť hru na načtení stránky - jen inicializuj, ne automaticky startuj
window.onload = () => {
  console.log("Hra je připravena. Klikni na START pro spuštění.");
};
