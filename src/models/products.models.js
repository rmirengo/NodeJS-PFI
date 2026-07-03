// import fs from 'fs/promises';
// import path from 'path';

// // Ruta al archivo JSON que contiene los productos
// const __dirname = import.meta.dirname;
// const dataPath = path.join(__dirname, '../data/products.json');

// //Funcion auxiliar para leer los productos desde el archivo JSON
// const readProductsFromFile = async () => {
//     try{
//         const jsonData = await fs.readFile(dataPath, 'utf-8');
//         return JSON.parse(jsonData);        
//     }catch (error){
//         // Si hay un error al leer el archivo, devolvemos un array vacío
//         return [];
//     }
// };

// // 1. Función para obtener todos los productos
// export const findAllProducts = async () => {
//     return await readProductsFromFile();    
// };

// // 2. Función para obtener un producto por su id
// export const findProductById = async (id) => {
//     const products = await readProductsFromFile();
//     return products.find(p => p.id === parseInt(id));
// };

// // 3. Función para obtener productos por categoría
// export const findProductsByCategory = async (category) => {
//     const products = await readProductsFromFile();
//     return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
// }

// // 4. Función para crear un nuevo producto
// export const save = async (data) => {
//     const products = await readProductsFromFile();

//     // Creamos un nuevo producto con un id único y los datos recibidos
//     const newProduct = { id: products.length + 1, ...data };
//     products.push(newProduct);

//     //Sobreescribimos el archivo JSON con el nuevo producto agregado
//     await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
//     return newProduct;
// };

// // 5. Funcion para eliminar un producto por su id
// export const remove = async (id) => {
//     const products = await readProductsFromFile();

//     const updatedProducts = products.filter(p => p.id !== parseInt(id));

//     await fs.writeFile(dataPath, JSON.stringify(updatedProducts, null, 2));
//     return true;
// };

// // 6. Actualizar un producto por su id
// export const update = async (id, updatedData) => {
//     const products = await readProductsFromFile();
//     // Buscamos el índice del producto a actualizar
//     const index = products.findIndex(p => p.id === parseInt(id));
//     // Si no lo encuentra, findIndex devuelve -1, por lo que retornamos null para indicar que no se encontró el producto
//     if (index === -1) return null;
//     // Pisamos el producto existente con los nuevos datos, manteniendo el id original
//     products[index] = { ...products[index],...updatedData, id: parseInt(id) };
//     //Guardamos los cambios en el archivo JSON
//     await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
    
//     return products[index]; // Se devuelve el producto actualizado
// };

import { db } from '../data/firebase.data.js'; // Se importa la DB
import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore';

const collectionName = 'products';

// 1. OBTENER TODOS LOS PRODUCTOS.
export const findAllProducts = async () => {
    try {        
        const productsCollection = collection(db, collectionName);               
        const productSnapshot = await getDocs(productsCollection);
        
        return productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));                 
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [];
    }
};

// 2. OBTENER PRODUCTOS POR ID
export const findProductById = async (id) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data()};
        } else{
            return null; //Si el id no existe devuelve null
        } 
    } catch (error) {
        console.error(`Error al buscar el producto con id ${id}`,error);
        return null;
    }
};

// 3. OBTENER PRODUCTOS POR CATEGORIA

export const findProductsByCategory = async(category) => {
    try{
        const productsCollection = collection(db, collectionName);

        const q = query(productsCollection, where("category", "==", category));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }catch (error){
        console.error(`Error al buscar productos de categoria ${category}`,error)
        return[];
    }
};

//4. CREAR UN PRODUCTO NUEVO
export const save = async (data) => {
    try {
        const productsCollection = collection(db, collectionName);
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    } catch(error){
        console.error("Error al cargar el producto:", error);
        throw error;
    }    
};

//5. ACTUALIZAR UN PRODUCTO EXISTENTE

export const update = async (id, updatedData) => {
    try{
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error(`Error al actualizar el producto con id ${id}`, error);
        return null;
    }
};

//6. ELIMINAR UN PRODUCTO

export const remove = async (id) => {
    try {
        const docRef = doc (db, collectionName, id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(`Error al eliminar el producto con id ${id}`, error);
        return false;
    }
};
