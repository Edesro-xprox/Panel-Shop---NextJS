import { API_URL } from '../lib/api';

const createProductFormData = (product) => {
    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
        if (value === undefined || value === null || (key === 'image' && typeof value === 'string')) {
            return;
        }

        formData.append(key, typeof File !== 'undefined' && value instanceof File ? value : String(value));
    });

    console.log(formData);
    console.log(formData.get('image'));

    return formData;
};

const productService = {
    getProducts: async () =>{
        try{
            const res = await fetch(`${API_URL}/products`);
            return await res.json();
        }catch(error){
            console.error(error);
        }
    },

    getProductById: async (id) =>{
        try{
            const res = await fetch(`${API_URL}/products/${id}`);
            return await res.json();
        }catch(error){
            console.error(error);
        }
    },

    addProduct: async (product) =>{
        console.log('product', product);
        try{
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                body: createProductFormData(product)
            });
            if (!res.ok) throw new Error(`Error al crear producto: ${res.status}`);
            return await res.json();
        }catch(error){
            console.error(error);
            return null;
        }
    },

    updateProduct: async (id, product) =>{
        try{
            console.log('id', id);
            console.log('productService.editProduct', product);
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                body: createProductFormData(product)
            });
            if (!res.ok) throw new Error(`Error al actualizar producto: ${res.status}`);
            return await res.json();
        }catch(error){
            console.error(error);
            return null;
        }
    },

    activateProduct: async (id, status) =>{
        try{
            const res = await fetch(`${API_URL}/products/${id}/${status}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        }catch(error){
            console.error(error);
        }

    }
}

export default productService;