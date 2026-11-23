
import express from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/db.js";
import { Cartes } from "../db/schema.js";

const router = express.Router();

// Récupération de l'image d'une carte
router.get("/:id/image", (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).send("Identifiant invalide");
        }

        const carte = db
            .select({ Image: Cartes.Image })
            .from(Cartes)
            .where(eq(Cartes.Id_Carte, id))
            .get();

        if (!carte || !carte.Image) {
            return res.status(404).send("Image introuvable");
        }

        const image = carte.Image;

        if (image.subarray(0, 8).equals(
            Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
        )) {
            res.type("image/png");
        } else if (image.subarray(0, 3).equals(
            Buffer.from([255, 216, 255])
        )) {
            res.type("image/jpeg");
        } else if (
            image.subarray(0, 6).toString() === "GIF89a" ||
            image.subarray(0, 6).toString() === "GIF87a"
        ) {
            res.type("image/gif");
        } else {
            res.type("application/octet-stream");
        }

        res.send(image);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de l'image");
    }
});

export default router;
