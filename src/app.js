// app.js
const express = require('express');
const db = require('./models'); // Importar los modelos desde models/index.js
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;



// Middlewares
app.use(express.json());




// // Rutas
// app.use('/users', userRoutes);
// app.use('/transactions', transactionRoutes);

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