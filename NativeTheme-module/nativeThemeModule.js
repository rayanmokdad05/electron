const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");

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

  mainWindow.loadFile("indexNativeTheme.html");
}

app.whenReady().then(() => {
  createWindow();

  // Envoyer les informations sur le thème actuel au PR lorsque la fenetre finit de charger
  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send(
      "theme-changed",
      nativeTheme.shouldUseDarkColors
    );
  });

  // reste en ecoute au cas ou il y a changement et lorsque changement detecter , envoie les informations au PRz
  nativeTheme.on("updated", () => {
    mainWindow.webContents.send(
      "theme-changed",
      nativeTheme.shouldUseDarkColors
    );
  });

  // Gérer les demandes de changement de thème depuis le rendu
  ipcMain.on("toggle-theme", () => {
    nativeTheme.themeSource =
      // verifie theme actuel avec themeSource (si dark alors light sinon dark)
      nativeTheme.themeSource === "dark" ? "light" : "dark";
  });
});
