import express from 'express';
import { 
    getAllProducts, 
    getProductById, 
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
 } from '../controllers/products.controller.js'; // Importamos el controlador de productos
import { authMiddleware } from '../middlewares/auth.middleware.js';

// utilizamos Router() para crear un mini servidor especifico para productos
const router = express.Router();

//Rutas Publicas
// Rutas para obtener los productos general, por id y por categoria
router.get('/', getAllProducts); // Usamos el controlador para manejar la ruta de productos
router.get('/:id', getProductById); // Usamos el controlador para manejar la ruta de detalle de producto
router.get('/category/:category', getProductsByCategory); // Usamos el controlador para manejar la ruta de productos por categoría

//Rutas Protegidas
//Rutas para Crear, modificar y eliminar un producto
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
