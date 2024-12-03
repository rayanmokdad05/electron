const fs = require("fs");
const path = require("path");
const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  // Créer une fenêtre invisible
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Ne pas afficher la fenêtre immédiatement
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

// Fonction pour écrire dans un fichier
function ecrireFic(filePath, content) {
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Erreur lors de lecriture du fichier:", err);
      return;
    }
    console.log("Le fichier a ete cree et son contenu ecrit.");
  });
}

// Fonction pour ajouter du contenu à un fichier existant
function ajouterAFic(filePath, content) {
  fs.appendFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Erreur lors de lajout au fichier:", err);
      return;
    }
    console.log("Le texte a ete ajoute au fichier.");
  });
}

// Fonction pour lire un fichier
function lireFic(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier:", err);
      return;
    }
    console.log("Contenu du fichier:", data);
  });
}

// Fonction pour modifier un fichier
function modifierFic(filePath, contentToAppend) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier:", err);
      return;
    }
    const modifiedData = data + "\n" + contentToAppend;
    ecrireFic(filePath, modifiedData);
  });
}

// Fonction pour supprimer un fichier
function supFic(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Erreur lors de la suppression du fichier:", err);
      return;
    }
    console.log("Le fichier a ete supprime.");
  });
}

// Fonction pour créer un répertoire
function creerRepertoire(dirPath) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    // Ajouter l'option { recursive: true } pour éviter les erreurs si le répertoire existe déjà
    if (err) {
      console.error("Erreur lors de la creation du repertoire:", err);
      return;
    }
    console.log("Repertoire cree avec succes.");
  });
}

// Fonction pour lire le contenu d'un répertoire
function lireRepertoire(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Erreur lors de la lecture du repertoire:", err);
      return;
    }
    console.log("Fichiers dans le repertoire:", files);
  });
}

// Fonction pour supprimer un répertoire
function supRepertoire(dirPath) {
  // il doit etre vide pour fonctionner
  fs.rmdir(dirPath, (err) => {
    if (err) {
      console.error("Erreur lors de la suppression du repertoire:", err);
      return;
    }
    console.log("Repertoire supprime.");
  });
}

// Vérification si le fichier existe
function ficExiste(filePath) {
  if (fs.existsSync(filePath)) {
    console.log("Le fichier existe.");
  } else {
    console.log("Le fichier n'existe pas.");
  }
}

// Fonction principale d'initialisation de l'application
app.whenReady().then(() => {
  createWindow();

  // Exemple d'utilisation des fonctions
  const filePath = path.join(__dirname, "monFichier.txt");
  const dirPath = path.join(__dirname, "monDossier");
  const fic = path.join(__dirname, "monTexte.txt");

  // Créer un fichier
  //ecrireFic(filePath, "Contenu initial du fichier.");

  // Ajouter du contenu à un fichier existant
  //ajouterAFic(filePath, "\nTexte ajouté à la fin.");

  // Lire le fichier
  //lireFic(filePath);

  // Modifier le fichier
  //modifierFic(filePath, "Contenu modifié du fichier.");

  // Supprimer le fichier
  //supFic(filePath);

  // Créer un répertoire
  //creerRepertoire(dirPath);

  // Lire le contenu d'un répertoire
  //lireRepertoire(dirPath);

  // Supprimer un répertoire
  //supRepertoire(dirPath);

  // Vérifier si un fichier existe
  //ficExiste(fic);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
