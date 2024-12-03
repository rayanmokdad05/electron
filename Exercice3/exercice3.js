const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

let mainWindow;

function createWindow() {
  // Créer une fenêtre invisible
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("indexExercice3.html");
}
ipcMain.handle("ouvrir-fichier", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Choisissez un fichier",
    properties: ["openFile"],
    filters: [{ name: "Tous les fichiers", extensions: ["*"] }],
  });
  const filePath = result.filePaths[0];
  const contenu = fs.readFileSync(filePath, "utf8");
  return contenu; // Retourne le contenu du fichier
});

app.whenReady().then(() => {
  createWindow();
});
