// import { getFakeProducts } from '../services/products.services.js';
import * as productService from '../services/products.services.js'; // Importamos todo lo que hay en el servicio de productos

export const getAllProducts = async (req, res) => {
    // Ahora el controlador va a solicitar los productos al servicio y se los envia al cliente
    const products = await productService.getAllProducts();
    res.json(products);
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductDetail(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}; 
export const getProductsByCategory = async (req, res) => {
    try {
        // 1. Solicitamos la categoría desde los parámetros de la ruta
        const { category } = req.params;
        // 2. Solicitamos los productos de esa categoría al servicio
        const products = await productService.getProductsByCategory(category);
        // 3. Devolvemos los productos al cliente con un status 200
        res.status(200).json(products);
    }catch (error) {
        res.status(404).json({ error: error.message });
    }

} 