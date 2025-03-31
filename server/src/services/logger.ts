import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../log');
const logFilePath = path.join(logDir, 'log.txt');

// S'assurer que le dossier existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Fonction d'écriture de log
export function writeLog(message: string): void {
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFilePath, fullMessage, (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture dans le fichier log:", err);
    }
  });
}
