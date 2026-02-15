import type { IPurchase, ICartItem } from "../interfaces";
import type { IProduct } from "../../products";
import { getProductById } from "../../products";

let purchasesList: IPurchase[] = [];

function validateCartProducts(productIds: string[]): IProduct[] {
    const validProducts: IProduct[] = [];
    
    for (const productId of productIds) {
        const product = getProductById(productId);
        if (product) {
            validProducts.push(product);
        }
    }
    
    return validProducts;
}

function createPurchase(userId: string, productIds: string[]): IPurchase | null {
    const products = validateCartProducts(productIds);
    
    if (products.length === 0) {
        return null;
    }
    
    const items: ICartItem[] = products.map(product => ({
        productId: product.id,
        price: product.price
    }));
    
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
    
    const newPurchase: IPurchase = {
        id: Math.random().toString(36).substring(2, 11),
        userId,
        items,
        totalAmount,
        purchaseDate: new Date()
    };
    
    purchasesList.push(newPurchase);
    
    return newPurchase;
}

function getPurchasesByUserId(userId: string): IPurchase[] {
    return purchasesList.filter(purchase => purchase.userId === userId);
}

export {
    validateCartProducts,
    createPurchase,
    getPurchasesByUserId
}
