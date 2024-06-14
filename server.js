const express = require('express');
const app = express();
const path = require('path');

const PORT = 5500;
const HOST = '192.168.0.145';

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
