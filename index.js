import express from 'express';
import cors from 'cors';
import 'dotenv/config'; //Cargha las variables de entorno desde el inicio

const app = express();
const PORT = process.env.PORT || 3000; // Flexibilidad para producción y desarrollo

//Middlewares
app.use(cors()); // Permite que otros dominios puedan hacer consultas a nuestra API
app.use(express.json()); // Permite a nuestra API recibir datos en formato JSON

//Rutas
app.get('/ping', (req, res) => {
    res.send('pong'); // Endpoint de prueba para verificar que la API está funcionando
});

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto http://localhost:${PORT}`); // Mensaje en consola indicando que el servidor está corriendo 
});