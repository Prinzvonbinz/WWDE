let options = [];
let currentOptions = [];

function loadOptions() {
  const saved = localStorage.getItem("options");
  if (saved) {
    options = JSON.parse(saved);
  } else {
    // Standard-Optionen beim ersten Start
    options = [
      "Nie wieder Pizza essen",
      "Nie wieder Musik hören",
      "Fliegen können",
      "Unsichtbar sein",
      "Nur noch flüstern",
      "Nie wieder lügen können"
    ];
    saveOptions();
  }
}

function saveOptions() {
  localStorage.setItem("options", JSON.stringify(options));
}

function showNewPair() {
  if (options.length < 2) {
    alert("Bitte mindestens 2 Optionen im Editor hinzufügen!");
    return;
  }

  // Zwei verschiedene Optionen wählen
  let idx1 = Math.floor(Math.random() * options.length);
  let idx2;
  do {
    idx2 = Math.floor(Math.random() * options.length);
  } while (idx1 === idx2);

  currentOptions = [options[idx1], options[idx2]];

  document.querySelector(".left").textContent = currentOptions[0];
  document.querySelector(".right").textContent = currentOptions[1];
}

// Klick auf eine der Optionen
function choose(side) {
  showNewPair(); // direkt neues Paar anzeigen
}

// Klick auf den Bildschirm -> wenn leer, starte Spiel
document.body.addEventListener("click", function startGame(e) {
  if (
    e.target.classList.contains("left") ||
    e.target.classList.contains("right") ||
    e.target.id === "editIcon"
  ) return;
  showNewPair();
  document.body.removeEventListener("click", startGame);
});

// Optionen-Editor öffnen
function openEditor() {
  document.getElementById("editor").classList.remove("hidden");
  renderOptionList();
}

// Editor schließen
function closeEditor() {
  document.getElementById("editor").classList.add("hidden");
}

// Neue Option hinzufügen
function addOption() {
  const input = document.getElementById("newOption");
  const value = input.value.trim();
  if (value && !options.includes(value)) {
    options.push(value);
    saveOptions();
    renderOptionList();
    input.value = "";
  }
}

// Option löschen
function deleteOption(index) {
  options.splice(index, 1);
  saveOptions();
  renderOptionList();
}

// Editor-Liste aktualisieren
function renderOptionList() {
  const ul = document.getElementById("optionList");
  ul.innerHTML = "";
  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${opt}</span>
      <button onclick="deleteOption(${i})">✖</button>
    `;
    ul.appendChild(li);
  });
}

loadOptions();
