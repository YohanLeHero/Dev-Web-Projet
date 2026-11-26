import { db } from "./db.js";
import { Utilisateurs } from "./schema.js";
import { hashPassword } from "../utils/password.js";

// Comptes de test (à lister dans le README)
const comptes = [
    { Pseudo: "admin", Mdp: "admin123", IsAdmin: true },
    { Pseudo: "user", Mdp: "user123", IsAdmin: false }
];

for (const compte of comptes) {
    db.insert(Utilisateurs)
        .values({ ...compte, Mdp: hashPassword(compte.Mdp) })
        // Pseudo est unique : relancer le script ne crée pas de doublons
        .onConflictDoNothing({ target: Utilisateurs.Pseudo })
        .run();
}

console.log("Comptes de test prêts : admin / user");