
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import cardsRouter from "./routes/cards.js";
import pagesRouter from "./routes/pages.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration de Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Fichiers statiques
app.use(express.static(path.join(__dirname, "public"), {
    index: false
}));

// Routes
app.use("/api/cards", cardsRouter);
app.use("/", pagesRouter);

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Serveur démarré : http://localhost:3000");
});
