const { app, BrowserWindow, screen } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  // Récupération des dimensions de l'écran principal
  const ecranPrincipale = screen.getPrimaryDisplay();
  // Dans l'objet "workAreaSize" on trouve les dimensions de l'écran principal en utilisant les propriétés width et height et on créer des variables pour les stocker
  // qui ont le même nom (Destructuration en JS : facon d'extraire plusieurs propriétés d'un objet en une seule ligne de code)
  // autre facon d'écrire ce code -> const width = ecranPrincipale.workAreaSize.width; const height = ecranPrincipale.workAreaSize.height
  const { width, height } = ecranPrincipale.workAreaSize;

  console.log("Dimensions de lecran principal :", width, height);

  // Création d'une fenêtre avec la moitier de la taille de l'écran principal
  mainWindow = new BrowserWindow({
    width: width / 2,
    height: height / 2,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
});
