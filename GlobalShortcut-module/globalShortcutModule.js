const { app, BrowserWindow, globalShortcut } = require("electron");

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

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // Enregistrer un raccourci clavier global pour fermer l'application ctrl+Q
  globalShortcut.register("CommandOrControl+Q", () => {
    if (mainWindow) {
      mainWindow.close(); // Ferme la fenêtre
    }
  });
});

// Désinscrire les raccourcis clavier lorsque l'application quitte bonne pratique pour liberer les ressources
//sinon peut amener a fuite de mémoire et peut avoir conflits si plusieurs applications utilisent le même raccourci
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
