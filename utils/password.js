import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Hache un mot de passe : retourne "sel:hash" en hexadécimal
export function hashPassword(motDePasse) {
    const sel = randomBytes(16).toString("hex");
    const hash = scryptSync(motDePasse, sel, 64).toString("hex");
    return `${sel}:${hash}`;
}

// Compare un mot de passe saisi avec le "sel:hash" stocké en base
export function verifyPassword(motDePasse, stocke) {
    const [sel, hash] = stocke.split(":");
    const hashSaisi = scryptSync(motDePasse, sel, 64);
    return timingSafeEqual(hashSaisi, Buffer.from(hash, "hex"));
}