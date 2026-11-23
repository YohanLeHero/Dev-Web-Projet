
import { db } from "./db.js";
import {
  StylesDeJeu,
  Jeux,
  Cartes
} from "./schema.js";

const style = await db
  .insert(StylesDeJeu)
  .values({
    Nom: "RPG",
    Description: "Jeux de rôle"
  })
  .returning();

const jeu = await db
  .insert(Jeux)
  .values({
    Nom: "Pokemon",
    Studio: "Game Freak",
    Description: "Jeu de collection",
    Date_Sortie: "1996-02-27",
    Id_Style: style[0].Id_Style
  })
  .returning();

const carte = await db
  .insert(Cartes)
  .values({
    Nom_Personage: "Pikachu",
    Jeu: "Pokemon",
    Description: "Pokemon électrique",
    Rarete: "Rare",
    MiseEnAvant: true,
    Image: null,
    Id_Jeu: jeu[0].Id_Jeu
  })
  .returning();

console.log("Style créé :", style[0]);
console.log("Jeu créé :", jeu[0]);
console.log("Carte créée :", carte[0]);
