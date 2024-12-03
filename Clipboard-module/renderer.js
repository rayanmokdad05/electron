const { clipboard } = require("electron");

document.getElementById("copier-text").addEventListener("click", () => {
  const text = document.getElementById("text-a-copier").value;
  clipboard.writeText(text); // Copier le texte dans le presse-papier
  alert("Texte copier dans le presse-papier !");
});

document.getElementById("coller-text").addEventListener("click", () => {
  const text = clipboard.readText();
  document.getElementById(
    "clipboard-content"
  ).textContent = `Contenu du presse-papier : ${text}`;
});
