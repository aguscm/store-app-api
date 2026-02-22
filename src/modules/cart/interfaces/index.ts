export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IPurchaseItemRequest {
  productId: string;
  quantity: number;
}

export interface IPurchase {
  id: string;
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  purchaseDate: Date;
}

export interface IValidateCartRequest {
  items: IPurchaseItemRequest[];
}

export interface IPurchaseRequest {
  items: IPurchaseItemRequest[];
}
