const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'your_secret_key');
        req.user = decoded;  // Almacenar la información del usuario en `req.user`
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};
