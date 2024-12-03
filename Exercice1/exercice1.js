const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  clipboard,
  ipcMain,
} = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron Exercice 1",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("indexExercice1.html");

  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Copier",
      click: () => {
        // Envoyer une demande au processus de rendu pour copier le texte
        mainWindow.webContents.send("demande-de-copie");
      },
    })
  );

  // Afficher le menu contextuel lors d'un clic droit
  mainWindow.webContents.on("context-menu", (e, params) => {
    contextMenu.popup({ window: mainWindow });
  });

  // Recevoir le texte sélectionné depuis le processus de rendu et le copier
  ipcMain.on("copier-texte", (event, text) => {
    clipboard.writeText(text); // Copier le texte dans le presse-papiers
    console.log("Texte copier :", text);
  });
}

app.whenReady().then(createWindow);
