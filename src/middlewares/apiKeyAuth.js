// middlewares/apiKeyAuth.js
const ApiKey = require('../models/ApiKey'); // Suponiendo que tienes un modelo ApiKey

const apiKeyAuth = async (req, res, next) => {
    // Comprueba si la aplicación está en modo desarrollo
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Si está en desarrollo, permite el acceso
    if (isDevelopment) {
        return next();
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ message: 'API Key requerida' });
    }

    const validApiKey = await ApiKey.findOne({ where: { api_key: apiKey, is_active: true } });

    if (!validApiKey) {
        return res.status(401).json({ message: 'API Key inválida o desactivada' });
    }

    next();
};

module.exports = apiKeyAuth;
