const {
  app,
  BrowserWindow,
  globalShortcut,
  Notification,
  screen,
} = require("electron");

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

  mainWindow.loadFile("indexExercice5.html");
}

app.whenReady().then(() => {
  const ecranPrincipale = screen.getPrimaryDisplay();
  const { width, height } = ecranPrincipale.workAreaSize;

  console.log("Dimensions de lecran principal :", width, height);

  createWindow();

  // Enregistrer un raccourci clavier global pour fermer l'application ctrl+Q
  globalShortcut.register("CommandOrControl+W", () => {
    if (mainWindow) {
      mainWindow.close(); // Ferme la fenêtre
    }
    const notification = new Notification({
      title: "Notification App fermer",
      body: "Ceci est une notification pour dire que l'app est fermer.",
    });

    notification.show();
  });
});

// Désinscrire les raccourcis clavier lorsque l'application quitte bonne pratique pour liberer les ressources
//sinon peut amener a fuite de mémoire et peut avoir conflits si plusieurs applications utilisent le même raccourci
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
