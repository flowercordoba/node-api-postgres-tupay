const db = require('../models');
const Notification = db.Notification;

// Crear una nueva Notificación
exports.createNotification = async (req, res) => {
    try {
        const { message, notification_date, user_id, transaction_id } = req.body;
        const notification = await Notification.create({
            message,
            notification_date,
            user_id,
            transaction_id,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la notificación', details: error.message });
    }
};

// Obtener todas las Notificaciones
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las notificaciones', details: error.message });
    }
};

// Obtener una Notificación por ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la notificación', details: error.message });
    }
};

// Actualizar una Notificación por ID
exports.updateNotification = async (req, res) => {
    try {
        const { message, notification_date, user_id, transaction_id } = req.body;
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        await notification.update({
            message,
            notification_date,
            user_id,
            transaction_id,
        });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando la notificación', details: error.message });
    }
};

// Eliminar una Notificación por ID
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        await notification.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la notificación', details: error.message });
    }
};
