const { ipcRenderer } = require("electron");

//Attend que l'utilisateur clique sur le bouton ensuite il envoie un message au PP avec ipcRenderer.send
document.getElementById("envoyerMessage").addEventListener("click", () => {
  ipcRenderer.send("message-de-PR", "Bonjour du processus de rendu!");
});

// Lorsqu'il recoit un message avec l'identifiant "reponse-de-PP" il met a jour le contenu du <p> dans le html avec le id reponse pour afficher
// et donc le message du PP est affiché dans la page
ipcRenderer.on("reponse-de-PP", (event, message) => {
  document.getElementById("reponse").textContent = message;
});
