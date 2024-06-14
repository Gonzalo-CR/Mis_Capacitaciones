const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const PORT = 5500;
const HOST = '192.168.0.145';

// Middleware de seguridad
app.use(helmet()); // Configura cabeceras HTTP seguras
app.use(xssClean()); // Protege contra ataques XSS (Cross-Site Scripting)
app.use(hpp()); // Protege contra ataques de polución de parámetros HTTP

// Configuración de CORS
const corsOptions = {
  origin: '*', // Cambia esto para restringir orígenes específicos
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Configuración de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 peticiones por ventana de tiempo
});
app.use(limiter);

// Define la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Escucha en el puerto y la dirección especificados
app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

