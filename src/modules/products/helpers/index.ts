export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Toys',
  'Books',
  'Food & Beverages',
  'Health & Beauty',
  'Automotive',
  'Office'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export function isValidCategory(category: string): category is ProductCategory {
  return PRODUCT_CATEGORIES.includes(category as ProductCategory);
}
