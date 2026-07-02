import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extraemos el token del encabezado Authorization

    if (!token) return res.sendStatus(401); // Si no hay token, respondemos con 401 Unauthorized

    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, respondemos con 403 Forbidden
        next(); // Si el token es válido, pasamos al siguiente middleware o ruta
    });
};