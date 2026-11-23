
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";

import { db } from "./db.js";

import {
  StylesDeJeu,
  Jeux,
  Cartes,
  Utilisateurs,
  Collection,
  Boosters,
  Contient
} from "./schema.js";


const image = readFileSync("./test-image.jpg");


const style = db.insert(StylesDeJeu)
  .values({
    Nom: "RPG",
    Description: "Jeux de rôle"
  })
  .returning()
  .get();


const jeu = db.insert(Jeux)
  .values({
    Nom: "Pokemon",
    Studio: "Game Freak",
    Description: "Jeu de collection",
    Date_Sortie: "1996-02-27",
    Id_Style: style.Id_Style
  })
  .returning()
  .get();

const carte = db.insert(Cartes)
  .values({
    Nom_Personage: "Pikachu",
    Jeu: "Pokemon",
    Description: "Pokemon électrique",
    Rarete: "Rare",
    Image: image,
    MiseEnAvant: true,
    Id_Jeu: jeu.Id_Jeu
  })
  .returning()
  .get();


const utilisateur = db.insert(Utilisateurs)
  .values({
    Pseudo: "TestUser",
    Mdp: "motdepasse_test",
    IsAdmin: false
  })
  .returning()
  .get();


db.insert(Collection)
  .values({
    Id_Carte: carte.Id_Carte,
    Id_Utilisateur: utilisateur.Id_Utilisateur
  })
  .run();


const booster = db.insert(Boosters)
  .values({
    Nom: "Booster Pokemon",
    Nmbr_cartes: 10,
    MiseEnAvant: true
  })
  .returning()
  .get();


db.insert(Contient)
  .values({
    Id_Carte: carte.Id_Carte,
    Id_Booster: booster.Id_Booster
  })
  .run();


const resultat = db.select()
  .from(Cartes)
  .where(eq(Cartes.Id_Carte, carte.Id_Carte))
  .get();


console.log("Carte:", resultat.Nom_Personage);
console.log("Taille du l'image:", resultat.Image.length, "bit");
console.log("Image sauvegarder:", Buffer.isBuffer(resultat.Image));


const collection = db.select()
  .from(Collection)
  .where(eq(Collection.Id_Utilisateur, utilisateur.Id_Utilisateur))
  .all();

console.log("Cartes dans collection:", collection.length);


const contenu = db.select()
  .from(Contient)
  .where(eq(Contient.Id_Booster, booster.Id_Booster))
  .all();

console.log("Cartes dans booster:", contenu.length);


