const { app, BrowserWindow, Notification } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Créer et afficher la notification
  const notification = new Notification({
    title: "Notification Titre",
    body: "Ceci est une notification de test.",
    // peut aussi ajouter un icon
  });

  notification.show();
});
