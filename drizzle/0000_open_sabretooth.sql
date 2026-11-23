CREATE TABLE `Boosters` (
	`Id_Booster` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom` text NOT NULL,
	`Nmbr_cartes` integer NOT NULL,
	`MiseEnAvant` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Cartes` (
	`Id_Carte` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom_Personage` text NOT NULL,
	`Jeu` text,
	`Description` text,
	`Rarete` text,
	`Image` text,
	`MiseEnAvant` integer DEFAULT false NOT NULL,
	`Id_Jeu` integer NOT NULL,
	FOREIGN KEY (`Id_Jeu`) REFERENCES `Jeux`(`Id_Jeu`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Collection` (
	`Id_Carte` integer NOT NULL,
	`Id_Utilisateur` integer NOT NULL,
	PRIMARY KEY(`Id_Carte`, `Id_Utilisateur`),
	FOREIGN KEY (`Id_Carte`) REFERENCES `Cartes`(`Id_Carte`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`Id_Utilisateur`) REFERENCES `Utilisateurs`(`Id_Utilisateur`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Contient` (
	`Id_Carte` integer NOT NULL,
	`Id_Booster` integer NOT NULL,
	PRIMARY KEY(`Id_Carte`, `Id_Booster`),
	FOREIGN KEY (`Id_Carte`) REFERENCES `Cartes`(`Id_Carte`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`Id_Booster`) REFERENCES `Boosters`(`Id_Booster`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Jeux` (
	`Id_Jeu` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom` text NOT NULL,
	`MiseEnAvant` integer DEFAULT false NOT NULL,
	`Studio` text,
	`Description` text,
	`Date_Sortie` text,
	`Id_Style` integer NOT NULL,
	FOREIGN KEY (`Id_Style`) REFERENCES `StylesDeJeu`(`Id_Style`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `StylesDeJeu` (
	`Id_Style` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nom` text NOT NULL,
	`Description` text
);
--> statement-breakpoint
CREATE TABLE `Utilisateurs` (
	`Id_Utilisateur` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Pseudo` text NOT NULL,
	`Mdp` text NOT NULL,
	`IsAdmin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Utilisateurs_Pseudo_unique` ON `Utilisateurs` (`Pseudo`);