const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sirve archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Ruta predeterminada
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
