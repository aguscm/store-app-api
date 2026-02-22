import type { IPurchase, ICartItem, IPurchaseItemRequest } from "../interfaces";
import type { IProduct } from "../../products";
import { getProductById } from "../../products";

let purchasesList: IPurchase[] = [];

function getCartProducts(productIds: string[]): IProduct[] {
    const validProducts: IProduct[] = [];

    for (const productId of productIds) {
        const product = getProductById(productId);
        if (product) {
            validProducts.push(product);
        }
    }

    return validProducts;
}

function createPurchase(userId: string, purchaseItems: IPurchaseItemRequest[]): IPurchase | null {
    const items: ICartItem[] = [];

    for (const purchaseItem of purchaseItems) {
        const product = getProductById(purchaseItem.productId);

        if (!product) {
            continue;
        }

        items.push({
            productId: product.id,
            quantity: purchaseItem.quantity,
            price: product.price
        });
    }

    if (items.length === 0) {
        return null;
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
    getCartProducts,
    createPurchase,
    getPurchasesByUserId
}
