const { app, BrowserWindow } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({ width: 800, height: 600 });
}

app.on("ready", () => {
  createWindow();
  console.log("Electron app ready");
});

app.on("before-quit", () => {
  console.log("Avant la fermeture de l'application");
});

app.on("quit", () => {
  console.log("Application fermee");
});

/*
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); // Quitte l'application si ce n'est pas macOS
  }
});*/

if (process.platform === "darwin") {
  console.log("Vous êtes sur macOS.");
} else if (process.platform === "win32") {
  console.log("Vous êtes sur Windows.");
} else if (process.platform === "linux") {
  console.log("Vous êtes sur Linux.");
} else {
  console.log("Plateforme non supportée :", process.platform);
}
