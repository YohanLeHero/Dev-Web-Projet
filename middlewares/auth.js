// Rend l'utilisateur connecté disponible dans toutes les vues ({{utilisateur.Pseudo}})
export function chargerUtilisateur(req, res, next) {
    res.locals.utilisateur = req.session.utilisateur ?? null;
    next();
}

// Bloque l'accès aux visiteurs non connectés
export function requireAuth(req, res, next) {
    if (!req.session.utilisateur) {
        return res.redirect("/connexion");
    }
    next();
}

// Bloque l'accès aux non-administrateurs
export function requireAdmin(req, res, next) {
    if (!req.session.utilisateur) {
        return res.redirect("/connexion");
    }
    if (!req.session.utilisateur.isAdmin) {
        return res.status(403).send("Accès réservé aux administrateurs");
    }
    next();
}