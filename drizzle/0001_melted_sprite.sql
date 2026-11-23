PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Cartes` (
	`Id_Carte` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom_Personage` text NOT NULL,
	`Jeu` text,
	`Description` text,
	`Rarete` text,
	`Image` blob,
	`MiseEnAvant` integer DEFAULT false NOT NULL,
	`Id_Jeu` integer NOT NULL,
	FOREIGN KEY (`Id_Jeu`) REFERENCES `Jeux`(`Id_Jeu`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_Cartes`("Id_Carte", "Nom_Personage", "Jeu", "Description", "Rarete", "Image", "MiseEnAvant", "Id_Jeu") SELECT "Id_Carte", "Nom_Personage", "Jeu", "Description", "Rarete", "Image", "MiseEnAvant", "Id_Jeu" FROM `Cartes`;--> statement-breakpoint
DROP TABLE `Cartes`;--> statement-breakpoint
ALTER TABLE `__new_Cartes` RENAME TO `Cartes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;