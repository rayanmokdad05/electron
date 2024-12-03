const { ipcRenderer } = require("electron");

const resultat = document.getElementById("resultat");

document.getElementById("ouvrir-file").addEventListener("click", async () => {
  const filePaths = await ipcRenderer.invoke("affiche-open-dialog");
  resultat.textContent = filePaths.length
    ? `Fichiers selectionnes : ${filePaths.join(", ")}`
    : "Aucun fichier sélectionne.";
});

document.getElementById("save-file").addEventListener("click", async () => {
  const filePath = await ipcRenderer.invoke("affiche-save-dialog");
  resultat.textContent = filePath
    ? `Fichier sauvegarde a : ${filePath}`
    : "Aucun fichier sauvegarde.";
});

document
  .getElementById("affiche-message")
  .addEventListener("click", async () => {
    const response = await ipcRenderer.invoke("affiche-message-box");
    resultat.textContent = `Reponse : ${
      response === 0 ? "Oui" : response === 1 ? "Non" : "Annuler"
    }`;
  });
