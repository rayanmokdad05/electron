const { app, BrowserWindow, dialog, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("indexDialog.html");
}

// Gérer les dialogues avec le PR
ipcMain.handle("affiche-open-dialog", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Choisissez un fichier",
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif"] },
      { name: "Tous les fichiers", extensions: ["*"] },
    ],
  });
  return result.filePaths; // Retourne les fichiers sélectionnés
});

ipcMain.handle("affiche-save-dialog", async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Sauvegarder un fichier",
    defaultPath: "monFichier.txt",
    filters: [{ name: "Texte", extensions: ["txt"] }],
  });
  return result.filePath; // Retourne le chemin sauvegardé
});

ipcMain.handle("affiche-message-box", async () => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: "question",
    buttons: ["Oui", "Non", "Annuler"],
    title: "Confirmation",
    message: "Voulez-vous continuer ?",
  });
  return result.response; // Retourne l'index du bouton cliqué
});

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
