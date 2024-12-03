const { app, BrowserWindow, ipcMain, Notification } = require("electron");

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

  mainWindow.loadFile("indexExercice2.html");

  ipcMain.on("show-notification", (event, title, body) => {
    const notification = new Notification({ title, body });
    notification.show();
  });
}

app.whenReady().then(() => {
  createWindow();
});
