const { ipcRenderer } = require("electron");

const themeStatus = document.getElementById("theme-status");

// Mettre à jour le statut du thème
ipcRenderer.on("theme-changed", (event, isDark) => {
  // Une expression ternaire qui sélectionne "Sombre" si isDark est vrai, sinon "Clair".
  themeStatus.textContent = `Thème actuel : ${isDark ? "Sombre" : "Clair"}`;
});
