const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron avec IPC",
    webPreferences: {
      // permet de configurer certaines options de sécurité et de comportements pour les fenêtres
      nodeIntegration: true, // permet au PR (partie Front-end) d'utiliser les modules Node.js dans la fenêtre
      contextIsolation: false, // Il permet aux deuc processus de partager des données (pas tres securitaire)
    },
  });

  mainWindow.loadFile("indexIPC.html");

  //le PP attend un msg du PR
  ipcMain.on("message-de-PR", (event, arg) => {
    //quand le msg arrive, il est afficher dans la console et l'arg est le msg que le PR a envoyer
    console.log("Message recu du processus de rendu :", arg);
    //apres avoir afficher le msg, on envoie un msg au PR avec event.reply
    event.reply("reponse-de-PP", "Bonjour depuis le processus principal !");
  });
}

app.whenReady().then(createWindow);
