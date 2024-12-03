const { app, BrowserWindow } = require("electron");

let mainWindow, childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Application Electron",
    backgroundColor: "#ff6347",
  });

  childWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: false,
    show: false,
  });

  childWindow.loadURL("https://github.com");

  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });

  //mainWindow.loadFile("index.html");
  //mainWindow.loadURL('https://github.com')

  // Événements de fenêtre
  mainWindow.on("close", () => {
    console.log("La fenetre va etre fermee");
  });

  mainWindow.on("move", () => {
    console.log("La fenetre a ete deplacee");
  });

  childWindow.on("close", () => {
    console.log("La fenetre enfant va etre ferme");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
