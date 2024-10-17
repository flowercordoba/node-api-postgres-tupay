// app.js
const express = require('express');
const db = require('./models'); // Importar los modelos desde models/index.js
const routes = require('./routes'); // Importar las rutas centralizadas

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;



// Middlewares
app.use(express.json());


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