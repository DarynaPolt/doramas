document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // 1. 🔹 Плавний скрол до розділів (ВИПРАВЛЕННЯ ReferenceError)
  // Функція залишається локальною, але викликається через JS-обробник
  // =========================================================
  function scrollToSection(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Обробник для кнопки "Почати подорож" (яка тепер має data-target="test")
  const scrollButton = document.querySelector(".scroll-btn");
  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      const targetId = scrollButton.getAttribute("data-target"); 
      if (targetId) {
        scrollToSection(targetId);
      }
    });
  }

  // Обробник для посилань навігації (<a href="#...">)
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Забороняємо стандартний перехід
      const targetId = this.getAttribute('href').substring(1); // Отримуємо ID без #
      scrollToSection(targetId); // Викликаємо функцію
    });
  });

  // =========================================================
  // 2. 🔹 Підсвічування активного пункту при скролі
  // =========================================================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      // Використовуємо clientBoundingRect для точнішого визначення
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // =========================================================
  // 3. 🔹 Бургер-меню
  // =========================================================
  const burger = document.getElementById("burger"); // Переконайтеся, що burger є у вашому HTML
  const nav = document.getElementById("nav-links"); // Якщо ви маєте бургер, оберніть nav-links у блок з цим ID
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // 🎬 Випадкова "Дорама дня"
  const dramas = [
    {
      title: "Коли я лечу до тебе",
      desc: "Шістнадцятирічна Су Зайзай, натхненна випадковою зустріччю, відчуває безпорадне бажання познайомитися з Чжан Лураном — розумним, чарівним, але відстороненим однокласником.",
      img: "images/when_i_fly.jpg"
    },
    {
      title: "Розплутане кохання",
      desc: "1998 рік. Дівчина вирішує зізнатись у своїх почуттях, змінюючи все життя. Але доля підкидає їй нову зустріч — і нову історію про справжнє кохання.",
      img: "images/love_untangled.jpg"
    },
    {
      title: "Мій коханий демон",
      desc: "Щоб повернути втрачені сили, безжальний демон укладає угоду із суворою дівчиною.",
      img: "images/my_demon.jpg"
    },
    {
      title: "Сяючий кавунчик",
      desc: "У маленькому містечку підлітки створюють гурт, щоб поділитися своєю музикою зі світом. Їх поєднують мрії, дружба і випробування, що допомагають знайти власний шлях до світла.",
      img: "images/twinkling_watermelon.jpg"
    },
    {
      title: "Сильна жінка То Бон Сун",
      desc: "Бон Сун має надприродну силу, яку приховує від усіх.",
      img: "images/do_bong_soon.jpg"
    }
  ];

  const dramaImg = document.querySelector(".drama-img");
  const dramaTitle = document.getElementById("drama-title");
  const dramaDesc = document.getElementById("drama-desc");
// 🔹 Функція показу випадкової дорами
  function showRandomDrama() {
    const randomDrama = dramas[Math.floor(Math.random() * dramas.length)];

    // додаємо ефект зникання перед зміною картинки
    dramaImg.classList.remove("fade-in");
    void dramaImg.offsetWidth; // Хак для перезапуску CSS-анімації
    
    // Встановлення нового src, title та desc
      // set a fallback if image doesn't load
      dramaImg.onerror = () => {
        // fallback to site logo if specific drama image missing
        dramaImg.onerror = null; // avoid infinite loop
        dramaImg.src = "images/logo.png";
      };
      dramaImg.src = randomDrama.img;
    dramaTitle.textContent = randomDrama.title;
    dramaDesc.textContent = randomDrama.desc;
    
    dramaImg.classList.add("fade-in");
  }

  // Викликаємо при завантаженні сторінки
  if (dramaImg && dramaTitle && dramaDesc) {
      showRandomDrama();
  }
});
const questions = [
  {
    text: "1. Як ти любиш проводити вихідні?",
    answers: ["a) Активно, з емоціями і драйвом.", "b) На зустрічах, у спілкуванні з людьми.", "c) На сонці або просто весело.", "d) На природі, у тиші серед зелені.", "e) Побути на самоті біля води чи подумати.", "f) Нічого з цього не підходить."]
  },
  {
    text: "2. Яке слово найкраще про тебе?",
    answers: ["a) Пристрасть", "b) Теплота", "c) Оптимізм", "d) Рівновага", "e) Розум / спокій", "f) Жодне"]
  },
  {
    text: "3. Коли щось іде не за планом, ти…",
    answers: ["a) Дієш рішуче, не вагаючись.", "b) Шукаєш спосіб підняти настрій.", "c) Зберігаєш позитив і смієшся.", "d) Заспокоюєшся і шукаєш баланс.", "e) Аналізуєш і робиш висновки.", "f) Ігнорую — мені не підходить жоден варіант."]
  },
  {
    text: "4. Який пейзаж надихає більше за все?",
    answers: ["a) Яскравий захід сонця.", "b) Поле, де можна усміхатися.", "c) Сонячний пляж чи галявина.", "d) Ліс після дощу.", "e) Спокійне море або небо.", "f) Нічого з цього."]
  },
  {
    text: "5. Що ти обираєш у вільний момент?",
    answers: ["a) Нові пригоди і ризики.", "b) Спілкування, жарти, компанію.", "c) Сонце, легкість.", "d) Прогулянка в парку.", "e) Читання, роздуми.", "f) Жоден варіант."]
  },
  {
    text: "6. Який колір тягнеться до тебе інтуїтивно?",
    answers: ["a) Червоний", "b) Помаранчевий", "c) Жовтий", "d) Зелений", "e) Синій / Індиго", "f) Нічого не підходить"]
  }
];

const startBtn = document.getElementById("start-test-btn");
const testContainer = document.getElementById("test-container");
const questionContainer = document.getElementById("question-container");
const progressDots = document.getElementById("progress-dots");
const resultDiv = document.getElementById("color-result");
const section = document.querySelector(".color-test-section");

let currentQuestion = 0;
let answers = [];

startBtn.addEventListener("click", () => {
  if (startBtn) startBtn.classList.add("hidden");
  if (testContainer) testContainer.classList.remove("hidden");
  if (section) section.style.background = "white"; // ensure white while answering
  loadQuestion();
});

function loadQuestion() {
  // prepare container and progress first so the active dot can animate
  questionContainer.classList.remove('fade-in');
  questionContainer.innerHTML = "";
  resultDiv.classList.add("hidden");

  updateProgress();

  const q = questions[currentQuestion];

  const title = document.createElement("h3");
  title.textContent = q.text;
  questionContainer.appendChild(title);

  q.answers.forEach((ans) => {
    const letter = ans[0];
    // remove visible prefix like "a) " so letters are hidden from UI
    let visibleText = ans;
    if (ans.length > 2 && (ans[1] === ')' || ans[1] === '.')) {
      // common formats: "a) text" or "a. text"
      visibleText = ans.slice(2).trim();
      // also trim a leading punctuation/space if present
      if (visibleText.startsWith(')') || visibleText.startsWith('.')) visibleText = visibleText.slice(1).trim();
    } else if (ans.length > 3 && ans[2] === ')') {
      // fallback for formats like "a) text" if extra spacing
      visibleText = ans.slice(3).trim();
    }

    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = visibleText;
    // keep the letter available for scoring
    btn.setAttribute('data-letter', letter);
    // keep accessibility: announce the hidden letter to screen readers
    btn.setAttribute('aria-label', `${letter}) ${visibleText}`);
    btn.onclick = () => selectAnswer(letter);
    questionContainer.appendChild(btn);
  });

  // restart question fade-in animation
  void questionContainer.offsetWidth; // trigger reflow
  questionContainer.classList.add('fade-in');
}

function updateProgress() {
  progressDots.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === currentQuestion ? " active" : "");
    // show the number inside the rectangle
    dot.textContent = i + 1;
    progressDots.appendChild(dot);
  }
}

function selectAnswer(letter) {
  answers.push(letter);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  testContainer.classList.remove("hidden");
  questionContainer.innerHTML = "";
  progressDots.innerHTML = "";
  resultDiv.classList.remove("hidden");

  // Підрахунок
  const scores = {
    red: 0, orange: 0, yellow: 0, green: 0,
    blue: 0, indigo: 0, violet: 0, none: 0
  };

  answers.forEach(a => {
    if (a === "a") scores.red += 2;
    if (a === "b") { scores.orange += 2; scores.indigo += 1; }
    if (a === "c") { scores.yellow += 2; scores.violet += 1; }
    if (a === "d") { scores.green += 2; scores.indigo += 1; }
    if (a === "e") { scores.blue += 2; scores.violet += 1; }
    if (a === "f") scores.none += 1;
  });

  let finalColor = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  if (scores.none >= 3) finalColor = "none";

  let description = "";
  const descriptions = {
    red: "Червоний — енергія, пристрасть, лідерство.",
    orange: "Помаранчевий — теплий, товариський, життєрадісний.",
    yellow: "Жовтий — оптиміст, легкість, креатив.",
    green: "Зелений — гармонія, природа, стабільність.",
    blue: "Синій — мудрість, спокій, логіка.",
    indigo: "Індиго — інтуїція, глибина, таємничість.",
    violet: "Фіолетовий — творчість, мрійливість, містика.",
    none: "Ти поза рамками — увесь спектр одразу 🌈"
  };

  description = descriptions[finalColor];
  resultDiv.innerHTML = `<h3>${description}</h3>
  <button id="restart-btn">Пройти ще раз</button>`;

  // 🌈 Плавна пастельна анімація — персоналізований фон залежно від кольору
  const colorClass = `result-${finalColor}`;
  // remove any previous result classes
  const resultClasses = ['result-red','result-orange','result-yellow','result-green','result-blue','result-indigo','result-violet','result-none','colorful-bg'];
  resultClasses.forEach(c => section.classList.remove(c));
  // add chosen class slightly after rendering for smoother transition
  setTimeout(() => {
    // remove inline background override so CSS class background is applied
    if (section && section.style) section.style.background = "";
    section.classList.add(colorClass);
  }, 180);

  // attach restart handler
  const restartEl = document.getElementById("restart-btn");
  if (restartEl) restartEl.addEventListener("click", restartTest);
}

function restartTest() {
  // remove any result-specific classes and keep the test area white again
  const resultClasses = ['result-red','result-orange','result-yellow','result-green','result-blue','result-indigo','result-violet','result-none','colorful-bg'];
  resultClasses.forEach(c => section.classList.remove(c));
  section.style.background = "white";
  currentQuestion = 0;
  answers = [];
  resultDiv.classList.add("hidden");
  loadQuestion();
}

// IntersectionObserver: fade in result background and increase intensity when section enters viewport
if (section) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('in-viewport');
      } else {
        section.classList.remove('in-viewport');
      }
    });
  }, { threshold: 0.35 }); // adjust threshold to trigger when roughly a third is visible

  io.observe(section);
}
