import express from 'express';
import cors from 'cors';
import 'dotenv/config'; //Carga las variables de entorno desde el inicio

// importacion de rutas
import productsRoutes from './routes/products.routes.js'; // Importamos las rutas de productos
import authRoutes from './routes/auth.routes.js'; // rutas de login

const app = express();
const PORT = process.env.PORT || 3000; // Flexibilidad para producción y desarrollo

//Middlewares globales
//1. Seguridad y formato
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

})); 
app.use(express.json());

//2. Log de solicitudes
app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`); // Log de las solicitudes entrantes
    next(); // Pasamos al siguiente middleware o ruta
});


//Definicion de Rutas
//Ruta de prueba
app.get('/ping', (req, res) => {
    res.send('pong');
});

//Rutas de la Api
app.use('/api/products', productsRoutes); // Usamos las rutas de productos bajo el prefijo /api
app.use('/api/auth', authRoutes);

//Manejo de Errores

app.use(function (req, res, next) {
    res.status(404)
    res.send("Ruta no Encontrada")
});

//Arranque del servidor
app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`El servidor esta corriendo en el puerto http://localhost:${PORT}`);
    console.log(`================================================================`);
});

export default app;