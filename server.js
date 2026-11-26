import express from "express";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";

import authRouter from "./routes/auth.js";
import cardsRouter from "./routes/cards.js";
import pagesRouter from "./routes/pages.js";
import { chargerUtilisateur } from "./middlewares/auth.js";

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

// Lecture des formulaires (req.body)
app.use(express.urlencoded({ extended: false }));

// Sessions (stockées en mémoire : perdues au redémarrage du serveur)
app.use(session({
    secret: process.env.SESSION_SECRET ?? "secret-local-dev",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" }
}));

// Rend l'utilisateur connecté disponible dans toutes les vues
app.use(chargerUtilisateur);

// Routes
app.use("/", authRouter);
app.use("/api/cards", cardsRouter);
app.use("/", pagesRouter);

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Serveur démarré : http://localhost:3000");
});