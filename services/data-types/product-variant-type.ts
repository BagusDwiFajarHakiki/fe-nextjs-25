import { ProductCategoryType } from "./product-category-type";
import { ProductType } from "./product-type";

export interface ProductVariantType {
  id?: number;
  product_category_id: number;
  product_id: number;
  name: string;
  price: number;
  stock: number;
  categories?: ProductCategoryType;
  products?: ProductType;
}