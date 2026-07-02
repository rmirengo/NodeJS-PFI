// export const getFakeProducts = () => {
//     return [
//         {
//             id: 1, name: "Procesador Intel i7", price: 300, stock: 10
//         },
//         {
//             id: 2, name: "Tarjeta Gráfica RTX 3080", price: 800, stock: 5
//         }
//     ];
// };

import * as productModel from '../models/products.model.js'; // Exportamos todo lo que hay en el modelo de productos

export const getAllProducts = async () => {
    return await productModel.findAllProducts();
};

export const getProductDetail = async (id) => {
    const product = await productModel.findProductById(id);
    
    if (!product) throw new Error(`id de producto ${id} no encontrado`);
    return product;
};

export const getProductsByCategory = async(category) => {
    const products = await productModel.findProductsByCategory(category);
    return products;
}

