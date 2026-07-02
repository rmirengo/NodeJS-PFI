const products = [
    {
        id: 1, name: "Procesador Intel i7", price: 300, category: "Procesadores", stock: 10
    },
    {
        id: 2, name: "Tarjeta Gráfica RTX 3080", price: 800, category: "Tarjetas Gráficas", stock: 5
    },
    {
        id: 3, name: "Memoria RAM 16GB", price: 100, category: "Memorias", stock: 20
    }
];

export const findProductById = async (id) => {
    return products.find(p => p.id === parseInt(id));
};

export const findAllProducts = async () => {
    return products; // Devuelve el array completo que está arriba
};

export const findProductsByCategory = async (category) => {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export const save = async (data) => {
    const newProduct = {id: products.length + 1, ...data};
    products.push(newProduct);
    return newProduct;    
};