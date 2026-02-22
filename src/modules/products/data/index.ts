import type { IProduct, IProductFilter, IPaginator } from "../interfaces/index";
import type { ProductCategory } from "../helpers";
import { isValidCategory } from "../helpers";
import productsJson from "./products.json";

let productsList: IProduct[] = productsJson.map(product => ({
    ...product,
    category: product.category as ProductCategory,
    createdAt: new Date(product.createdAt)
}));

function validateProductFields(product: Omit<IProduct, 'id'>): { valid: boolean; message?: string } {
    const requiredFields = ['name', 'description', 'price', 'category', 'stock', 'imageUrl', 'brand', 'createdAt'];

    for (const field of requiredFields) {
        if (product[field] === undefined || product[field] === null ||
            (typeof product[field] === 'string' && product[field].trim() === '')) {
            return { valid: false, message: `${field} is required` };
        }
    }

    if (!isValidCategory(product.category)) {
        return { valid: false, message: `Invalid category: ${product.category}` };
    }

    if (typeof product.price !== 'number' || product.price < 0) {
        return { valid: false, message: 'Price must be a positive number' };
    }

    if (typeof product.stock !== 'number' || product.stock < 0) {
        return { valid: false, message: 'Stock must be a positive number' };
    }

    return { valid: true };
}

function getProducts(limit: number = 10, offset: number = 0, filterBy?: IProductFilter): IPaginator<IProduct> {
    let filtered = productsList;

    if (filterBy) {
        if (filterBy.category) {
            filtered = filtered.filter(product => product.category === filterBy.category);
        }
        if (filterBy.brand) {
            filtered = filtered.filter(product => product.brand.toLowerCase() === filterBy.brand.toLowerCase());
        }
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);

    return {
        items,
        paginator: {
            limit,
            offset,
            total
        }
    };
}

function getProductById(productId: string): IProduct {
    return productsList.find((product: IProduct) => product.id === productId);
}

function addProduct(product: Omit<IProduct, 'id'>): IProduct {
    const validation = validateProductFields(product);
    if (!validation.valid) return null;

    const newProduct: IProduct = {
        id: Math.random().toString(36).substring(2, 11),
        ...product
    };

    productsList.push(newProduct);
    return newProduct;
}

function editProduct(id: string, updates: Partial<IProduct>): IProduct {
    const productIndex = productsList.findIndex((product: IProduct) => product.id === id);

    if (productIndex === -1) return null;

    if (updates.category && !isValidCategory(updates.category)) {
        return null;
    }

    productsList[productIndex] = {
        ...productsList[productIndex],
        ...updates
    };

    return productsList[productIndex];
}

function deleteProduct(id: string): boolean {
    const initialLength = productsList.length;
    productsList = productsList.filter((product: IProduct) => product.id !== id);
    return productsList.length < initialLength;
}

export {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    validateProductFields,
}
