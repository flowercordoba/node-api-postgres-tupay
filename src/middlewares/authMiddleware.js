// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';

// Usamos la variable de entorno JWT_SECRET
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key'; // Asegúrate de configurar JWT_SECRET en entornos seguros

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    // Verificar si el token está en formato 'Bearer token'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido. Use Bearer {token}' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        // Agregar el usuario decodificado al request
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
