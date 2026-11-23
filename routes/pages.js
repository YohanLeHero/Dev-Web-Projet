
import express from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/db.js";
import {
    Cartes,
    Jeux,
    StylesDeJeu
} from "../db/schema.js";

const router = express.Router();

// Affichage de la collection
router.get("/", (req, res) => {
    try {
        const cartes = db
            .select({
                Id_Carte: Cartes.Id_Carte,
                Nom_Personage: Cartes.Nom_Personage,
                Description: Cartes.Description,
                Rarete: Cartes.Rarete,
                MiseEnAvant: Cartes.MiseEnAvant,

                Nom_Jeu: Jeux.Nom,
                Studio: Jeux.Studio,
                Description_Jeu: Jeux.Description,
                Date_Sortie: Jeux.Date_Sortie,

                Nom_Style: StylesDeJeu.Nom,
                Description_Style: StylesDeJeu.Description
            })
            .from(Cartes)
            .leftJoin(Jeux, eq(Cartes.Id_Jeu, Jeux.Id_Jeu))
            .leftJoin(
                StylesDeJeu,
                eq(Jeux.Id_Style, StylesDeJeu.Id_Style)
            )
            .all();

        res.render("index", {
            titre: "Ma collection de cartes",
            cartes: cartes
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors du chargement de la collection");
    }
});

export default router;
