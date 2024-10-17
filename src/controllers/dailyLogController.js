const db = require('../models');
const DailyLog = db.DailyLog;

// Crear un nuevo Daily Log
exports.createDailyLog = async (req, res) => {
    try {
        const { log_date, details, transaction_id } = req.body;
        const dailyLog = await DailyLog.create({ log_date, details, transaction_id });
        res.status(201).json(dailyLog);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el Daily Log', details: error.message });
    }
};

// Obtener todos los Daily Logs
exports.getAllDailyLogs = async (req, res) => {
    try {
        const dailyLogs = await DailyLog.findAll();
        res.status(200).json(dailyLogs);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los Daily Logs', details: error.message });
    }
};

// Obtener un Daily Log por ID
exports.getDailyLogById = async (req, res) => {
    try {
        const dailyLog = await DailyLog.findByPk(req.params.id);
        if (!dailyLog) {
            return res.status(404).json({ error: 'Daily Log no encontrado' });
        }
        res.status(200).json(dailyLog);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el Daily Log', details: error.message });
    }
};

// Actualizar un Daily Log por ID
exports.updateDailyLog = async (req, res) => {
    try {
        const { log_date, details, transaction_id } = req.body;
        const dailyLog = await DailyLog.findByPk(req.params.id);
        if (!dailyLog) {
            return res.status(404).json({ error: 'Daily Log no encontrado' });
        }
        await dailyLog.update({ log_date, details, transaction_id });
        res.status(200).json(dailyLog);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el Daily Log', details: error.message });
    }
};

// Eliminar un Daily Log por ID
exports.deleteDailyLog = async (req, res) => {
    try {
        const dailyLog = await DailyLog.findByPk(req.params.id);
        if (!dailyLog) {
            return res.status(404).json({ error: 'Daily Log no encontrado' });
        }
        await dailyLog.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el Daily Log', details: error.message });
    }
};
