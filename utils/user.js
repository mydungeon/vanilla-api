import bcrypt from "bcrypt";

export function generateOTP() {
    return Math.floor(Math.random() * 9000 + 1000)
}

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

export async function comparePasswords(password, old) {
    const comparedPasswords = await bcrypt.compare(password, old);
    return comparedPasswords;
}
