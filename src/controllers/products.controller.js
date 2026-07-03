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

};

export const createProduct = async (req, res) => {
    try {
        // 1. Solicitamos al servicio que cree un nuevo producto con los datos recibidos en el body de la solicitud
        const newProduct = await productService.createProduct(req.body);
        // 2. Devolvemos el nuevo producto al cliente con un status 201 (creado)
        res.status(201).json(newProduct);
    }catch (error) {
        res.status(400).json({ message: "Error al crear el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // 1. Solicitamos al servicio que elimine el producto con el id recibido en los parámetros de la ruta
        await productService.deleteProduct(id);
        res.status(200).json({ message: `Producto con id ${id} eliminado con exito` });         // 2. Devolvemos un mensaje de éxito al cliente con un status 200
    } catch (error) {
        res.status(404).json({ message: `Error al eliminar el producto con id ${req.params.id}` }); // 3. Devolvemos un mensaje de error al cliente con un status 404
    }
    };

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}