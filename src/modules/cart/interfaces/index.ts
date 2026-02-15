export interface ICartItem {
  productId: string;
  price: number;
}

export interface IPurchase {
  id: string;
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  purchaseDate: Date;
}

export interface IValidateCartRequest {
  productIds: string[];
}
