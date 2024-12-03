const { clipboard, ipcRenderer } = require("electron");

document.getElementById("copier-text").addEventListener("click", () => {
  const text = document.getElementById("text-a-copier").value;
  clipboard.writeText(text); // Copier le texte dans le presse-papier

  // Envoyer un message au processus principal pour afficher une notification
  ipcRenderer.send(
    "show-notification",
    "Texte copié",
    "Votre texte a été copié avec succès."
  );
});
