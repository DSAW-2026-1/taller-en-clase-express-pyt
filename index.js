require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS abierto (IMPORTANTE PARA LA NOTA)
app.use(cors({
    origin: "*"
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});