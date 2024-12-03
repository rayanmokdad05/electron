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
