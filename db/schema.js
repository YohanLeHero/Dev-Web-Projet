
import {
  sqliteTable,
  integer,
  text,
  blob,
  primaryKey
} from "drizzle-orm/sqlite-core";


// 1. STYLES DE JEU


export const StylesDeJeu = sqliteTable("StylesDeJeu", {
  Id_Style: integer("Id_Style").primaryKey({
    autoIncrement: true
  }),

  Nom: text("Nom").notNull(),

  Description: text("Description")
});


// 2. JEUX


export const Jeux = sqliteTable("Jeux", {
    Id_Jeu: integer("Id_Jeu").primaryKey({ autoIncrement: true }),
    Nom: text("Nom").notNull(),
    MiseEnAvant: integer("MiseEnAvant", { mode: "boolean" }).notNull().default(false),
    Studio: text("Studio"),
    Description: text("Description"),
    Date_Sortie: text("Date_Sortie"),
    Image: blob("Image", { mode: "buffer" }),
    Id_Style: integer("Id_Style").notNull()
        .references(() => StylesDeJeu.Id_Style)
});


// 3. CARTES


export const Cartes = sqliteTable("Cartes", {
  Id_Carte: integer("Id_Carte").primaryKey({
    autoIncrement: true
  }),

  Nom_Personage: text("Nom_Personage").notNull(),

  Jeu: text("Jeu"),

  Description: text("Description"),

  Rarete: text("Rarete"),

  Image: blob("Image", {
  mode: "buffer"
}),

  MiseEnAvant: integer("MiseEnAvant", {
    mode: "boolean"
  }).notNull().default(false),

  Id_Jeu: integer("Id_Jeu")
    .notNull()
    .references(() => Jeux.Id_Jeu)
});

// 4. UTILISATEURS

export const Utilisateurs = sqliteTable("Utilisateurs", {
  Id_Utilisateur: integer("Id_Utilisateur").primaryKey({
    autoIncrement: true
  }),

  Pseudo: text("Pseudo").notNull().unique(),

  Mdp: text("Mdp").notNull(),

  IsAdmin: integer("IsAdmin", {
    mode: "boolean"
  }).notNull().default(false)
});


// 5. COLLECTION

export const Collection = sqliteTable("Collection", {
  Id_Carte: integer("Id_Carte")
    .notNull()
    .references(() => Cartes.Id_Carte, {
      onDelete: "cascade"
    }),

  Id_Utilisateur: integer("Id_Utilisateur")
    .notNull()
    .references(() => Utilisateurs.Id_Utilisateur, {
      onDelete: "cascade"
    })
}, (table) => [
  primaryKey({
    columns: [
      table.Id_Carte,
      table.Id_Utilisateur
    ]
  })
]);


// 6. BOOSTERS

export const Boosters = sqliteTable("Boosters", {
    Id_Booster: integer("Id_Booster").primaryKey({ autoIncrement: true }),
    Nom: text("Nom").notNull(),
    Nmbr_cartes: integer("Nmbr_cartes").notNull(),
    MiseEnAvant: integer("MiseEnAvant", { mode: "boolean" }).notNull().default(false),
    Image: blob("Image", { mode: "buffer" })
});


// 7. CONTIENT


export const Contient = sqliteTable("Contient", {
  Id_Carte: integer("Id_Carte")
    .notNull()
    .references(() => Cartes.Id_Carte, {
      onDelete: "cascade"
    }),

  Id_Booster: integer("Id_Booster")
    .notNull()
    .references(() => Boosters.Id_Booster, {
      onDelete: "cascade"
    })
}, (table) => [
  primaryKey({
    columns: [
      table.Id_Carte,
      table.Id_Booster
    ]
  })
]);
