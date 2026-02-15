export interface IError {
  id: string;
  status: number;
  message: string | ((param?: string) => string);
}

export const ERRORS = {
  INVALID_LIMIT: {
    id: 'INVALID_LIMIT',
    status: 400,
    message: 'Limit must be greater than 0'
  } as IError,
  NEGATIVE_OFFSET: {
    id: 'NEGATIVE_OFFSET',
    status: 400,
    message: 'Offset cannot be negative'
  } as IError,
  INVALID_CATEGORY: {
    id: 'INVALID_CATEGORY',
    status: 400,
    message: (category: string) => `Invalid category: ${category}. Valid categories are: Electronics, Fashion, Home & Garden, Sports, Toys, Books, Food & Beverages, Health & Beauty, Automotive, Office`
  } as IError,
  INVALID_CREDENTIALS: {
    id: 'INVALID_CREDENTIALS',
    status: 401,
    message: 'Invalid username or password'
  } as IError,
  UNAUTHORIZED: {
    id: 'UNAUTHORIZED',
    status: 401,
    message: 'Unauthorized. Please provide a valid token'
  } as IError,
  EMPTY_CART: {
    id: 'EMPTY_CART',
    status: 400,
    message: 'Cart is empty or contains invalid products'
  } as IError,
  PRODUCT_NOT_FOUND: {
    id: 'PRODUCT_NOT_FOUND',
    status: 404,
    message: 'Product not found'
  } as IError,
  INTERNAL_SERVER_ERROR: {
    id: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Internal server error'
  } as IError
} as const;

