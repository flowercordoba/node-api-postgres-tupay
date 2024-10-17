// app.js
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const db = require('./models'); // Importar los modelos desde models/index.js
const routes = require('./routes'); // Importar las rutas centralizadas
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Seguridad de cabeceras
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Limitar las solicitudes a la API
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limita cada IP a 100 solicitudes por ventana
});
app.use('/api/', limiter); // Aplica el limitador a las rutas de la API

// Usar las rutas centralizadas
app.use('/api', routes);

// Inicializa los modelos y arranca el servidor
// Sincronizar la base de datos
db.sequelize.sync() // Este método sincroniza todos los modelos con la base de datos
    .then(() => {
        console.log('Database synchronized successfully.');
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to synchronize the database:', err);
    });

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
