// middlewares/sessionAuth.js
const jwt = require('jsonwebtoken');

const sessionAuth = (req, res, next) => {
    // Comprueba si la aplicación está en modo desarrollo
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Si está en desarrollo, permite el acceso
    if (isDevelopment) {
        return next();
    }

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token de sesión requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = sessionAuth;
