document.addEventListener("DOMContentLoaded", () => {
    renderCards("regularRelaysContainer", regularRelays);
    renderCards("waterRelaysContainer", waterRelays);
    renderCards("bigGamesContainer", bigGames);
    renderSchedule("monday");
  
    setupBurgerMenu();
    setupScheduleButtons();
  });
  
  function renderCards(containerId, dataArray) {
    const container = document.getElementById(containerId);
  
    if (!container) return;
  
    container.innerHTML = "";
  
    dataArray.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <button class="card-btn">
          ${item.name}
          <span>+</span>
        </button>
  
        <div class="card-content">
          <p><strong>Що потрібно:</strong> ${item.equipment}</p>
          <p><strong>Правила:</strong> ${item.rules}</p>
          <p><strong>Кількість учасників:</strong> ${item.players}</p>
          <p><strong>Час проведення:</strong> ${item.time}</p>
          <p><strong>Примітки:</strong> ${item.notes}</p>
        </div>
      `;
  
      const button = card.querySelector(".card-btn");
      const plus = card.querySelector(".card-btn span");
  
      button.addEventListener("click", () => {
        card.classList.toggle("open");
        plus.textContent = card.classList.contains("open") ? "−" : "+";
      });
  
      container.appendChild(card);
    });
  }
  
  function setupScheduleButtons() {
    const buttons = document.querySelectorAll(".day-btn");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
  
        const day = button.dataset.day;
        renderSchedule(day);
      });
    });
  }
  
  function renderSchedule(dayKey) {
    const container = document.getElementById("scheduleContainer");
    const dayData = scheduleData[dayKey];
  
    if (!container || !dayData) return;
  
    container.innerHTML = `
      <h3>${dayData.day}</h3>
  
      <ul>
        <li><strong>Велика гра:</strong> ${dayData.bigGame}</li>
        ${dayData.relays
          .map((relay, index) => `<li><strong>Естафета ${index + 1}:</strong> ${relay}</li>`)
          .join("")}
      </ul>
    `;
  }
  
  function setupBurgerMenu() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav a");
  
    if (!burger || !nav) return;
  
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active");
    });
  
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }