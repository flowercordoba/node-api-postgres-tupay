// controllers/userController.js
const db = require('../models');
const User = db.User; // Importar el modelo de usuario

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, onboarding_date } = req.body;
        const user = await User.create({ name, email, onboarding_date });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el usuario', details: error.message });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los usuarios', details: error.message });
    }
};

// Obtener un solo usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el usuario', details: error.message });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const { name, email, onboarding_date } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user.update({ name, email, onboarding_date });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el usuario', details: error.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el usuario', details: error.message });
    }
};
