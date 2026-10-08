import productService from "@/services/productService";
import { FilterTypeProduct, Product } from "@/types/product";
import { useEffect, useState } from "react";

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [type, setType] = useState<FilterTypeProduct>("Todos");
    const [search, setSearch] = useState("");

    const typeMapping = {
        "Todos": "Todos",
        "Laptop": "laptop",
        "Audífono": "headphone",
        "Celular": "cellphone",
        "Televisor": "television",
        "Cámaras": "camera"
    }

    const fetchProducts = async () => {
        let data = [];
        const res = await productService.getProducts();
        if(type == 'Todos'){
            data = [...res.filter((d: Product) => d.name.toLowerCase().includes(search.toLowerCase()))];
        }else{
            data = [...res
                .filter((d: Product) => d.type == typeMapping[type])
                .filter((d: Product) => d.name.toLowerCase().includes(search.toLowerCase()))
            ];
        }
        setProducts(data);
    };

    // const fetchProductsById = async (id: string) => {
    //     const res = await productService.getProductById(id);
    //     setEdit(res);
    // }

    useEffect(() => {
        fetchProducts();
    }, [type, search]);

    const handleToggleStatus = async (id: string, status: boolean) => {
        const res = await productService.activateProduct(id, status);
        if(res){
            fetchProducts();
        }
        return res;
    }



    return { 
        products,
        type,
        setType,
        search,
        setSearch,
        handleToggleStatus,
        // fetchProductsById,
        // edit
    };
}

export default useProduct;