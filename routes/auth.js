import express from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/db.js";
import { Utilisateurs } from "../db/schema.js";
import { verifyPassword } from "../utils/password.js";

const router = express.Router();

// Formulaire de connexion
router.get("/connexion", (req, res) => {
    // Déjà connecté : inutile de réafficher le formulaire
    if (req.session.utilisateur) {
        return res.redirect("/");
    }
    res.render("connexion", { titre: "Connexion" });
});

// Vérification des identifiants
router.post("/connexion", (req, res, next) => {
    try {
        const pseudo = (req.body.pseudo ?? "").trim();
        const mdp = req.body.mdp ?? "";

        const utilisateur = db.select().from(Utilisateurs)
            .where(eq(Utilisateurs.Pseudo, pseudo)).get();

        // Même message dans les deux cas : on ne révèle pas si le pseudo existe
        if (!utilisateur || !verifyPassword(mdp, utilisateur.Mdp)) {
            return res.status(401).render("connexion", {
                titre: "Connexion",
                erreur: "Pseudo ou mot de passe incorrect.",
                pseudo
            });
        }

        // Nouvel identifiant de session à chaque connexion (anti fixation de session)
        req.session.regenerate((err) => {
            if (err) return next(err);

            req.session.utilisateur = {
                id: utilisateur.Id_Utilisateur,
                Pseudo: utilisateur.Pseudo,
                isAdmin: utilisateur.IsAdmin
            };

            req.session.save((err) => {
                if (err) return next(err);
                res.redirect("/");
            });
        });
    } catch (error) {
        next(error);
    }
});

// Déconnexion
router.post("/deconnexion", (req, res) => {
    req.session.destroy(() => res.redirect("/"));
});

export default router;