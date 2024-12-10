const { app, BrowserWindow, Menu, MenuItem } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron Menu Exemple",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  // Création d'un menu contextuel
  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Option 1",
      click: () => console.log("Option 1 selectionnee"),
    })
  );
  contextMenu.append(
    new MenuItem({
      label: "Option 2",
      click: () => console.log("Option 2 selectionnee"),
    })
  );

  // Afficher le menu contextuel lors du clic droit
  mainWindow.webContents.on("context-menu", (e, params) => {
    contextMenu.popup({ window: mainWindow });
  });

  // Création d'un menu personnalisé
  const menu = Menu.buildFromTemplate([
    {
      label: "Fichier",
      submenu: [
        {
          label: "Nouveau",
          click() {
            console.log("Nouvelle option selectionnee !");
          },
        },
        {
          label: "Quitter",
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Édition",
      submenu: [
        {
          label: "Annuler",
          role: "undo", // rôle prédéfini pour Annuler
        },
        {
          label: "Rétablir",
          role: "redo", // rôle prédéfini pour Rétablir
        },
        {
          type: "separator", // Séparateur entre les options
        },
        {
          label: "Couper",
          role: "cut", // rôle prédéfini pour Couper
        },
        {
          label: "Copier",
          role: "copy", // rôle prédéfini pour Copier
        },
        {
          label: "Coller",
          role: "paste", // rôle prédéfini pour Coller
        },
      ],
    },
  ]);

  // Appliquer le menu à la fenêtre
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
