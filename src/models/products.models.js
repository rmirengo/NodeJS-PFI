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
