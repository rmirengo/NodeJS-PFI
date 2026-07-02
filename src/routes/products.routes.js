import express from 'express';
import { getAllProducts, getProductById, getProductsByCategory } from '../controllers/products.controller.js'; // Importamos el controlador de productos


// utilizamos Router() para crear un mini servidor especifico para productos
const router = express.Router();

// router.get('/products', (req, res) => {
//     res.json({ message: 'Pronto veras el catalogo aqui'});
// });

// ruta para obtener todos los productos
router.get('/products', getAllProducts); // Usamos el controlador para manejar la ruta de productos
// ruta para obtener un producto por su id
router.get('/products/:id', getProductById); // Usamos el controlador para manejar la ruta de detalle de producto
// ruta para obtener productos por categoría
router.get('/products/category/:category', getProductsByCategory); // Usamos el controlador para manejar la ruta de productos por categoría

//ruta para crear un producto
//router.post('/products', createProduct);

//ruta para actualizar un producto
//router.put('/products/:id', updateProduct);

//ruta para elimnar productos, con middleware de autenticación
//router.delete('/products/:id', deleteProduct);


export default router;
