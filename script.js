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
