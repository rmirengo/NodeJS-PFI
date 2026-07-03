import * as productModel from '../models/products.models.js'; // Exportamos todo lo que hay en el modelo de productos

// 1. Función para obtener todos los productos
export const getAllProducts = async () => {
    return await productModel.findAllProducts();
};
// 2. Función para obtener un producto por su id
export const getProductDetail = async (id) => {
    const product = await productModel.findProductById(id);
    
    if (!product) throw new Error(`id de producto ${id} no encontrado`);
    return product;
};
// 3. Función para crear un nuevo producto
export const createProduct = async (data) => {
    return await productModel.save(data);
};
// 4. Función para obtener productos por categoría
export const getProductsByCategory = async (category) => {
    const products = await productModel.findProductsByCategory(category);
    return products;
}
// 5. Funcion para eliminar un producto por su id
export const deleteProduct = async (id) => {
    await getProductDetail(id);

    return await productModel.remove(id);
};
// 6. Función para actualizar un producto por su id
export const updateProduct = async (id, data) => {
    const updatedProduct = await productModel.update(id, data);
    if (!updatedProduct) throw new Error(`id de producto ${id} no encontrado`);
    return updatedProduct;
};