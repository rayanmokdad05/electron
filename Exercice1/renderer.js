const { ipcRenderer } = require("electron");

// Récupérer la sélection et envoyer au processus principal
ipcRenderer.on("demande-de-copie", () => {
  const selectedText = window.getSelection().toString(); // Récupère le texte sélectionné
  ipcRenderer.send("copier-texte", selectedText); // Envoie le texte sélectionné au processus principal
});
