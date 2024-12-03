const { ipcRenderer } = require("electron");

document
  .getElementById("ouvrir-fichier")
  .addEventListener("click", async () => {
    const contenu = await ipcRenderer.invoke("ouvrir-fichier");
    console.log("Contenu du fichier :", contenu);

    // Affiche le contenu dans une zone dédiée
    const displayArea = document.getElementById("resultat");
    displayArea.textContent = contenu;
  });
