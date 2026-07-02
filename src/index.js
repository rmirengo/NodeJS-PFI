import express from 'express';
import cors from 'cors';
import 'dotenv/config'; //Carga las variables de entorno desde el inicio
import productsRoutes from './routes/products.routes.js'; // Importamos las rutas de productos

const app = express();
const PORT = process.env.PORT || 3000; // Flexibilidad para producción y desarrollo

//Middlewares
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

})); // Permite que otros dominios puedan hacer consultas a nuestra API

app.use(express.json()); // Permite a nuestra API recibir datos en formato JSON

app.use('/api', productsRoutes); // Usamos las rutas de productos bajo el prefijo /api

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`); // Log de las solicitudes entrantes
    next(); // Pasamos al siguiente middleware o ruta
});

//Rutas
app.get('/ping', (req, res) => {
    res.send('pong'); // Endpoint de prueba para verificar que la API está funcionando
});

app.use(function (req, res, next) {
    res.status(404)
    res.send("Ruta no Encontrada")
});

//const PORT = process.env.PORT || 3000; // Flexibilidad para producción y desarrollo
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto http://localhost:${PORT}`); // Mensaje en consola indicando que el servidor está corriendo 
});