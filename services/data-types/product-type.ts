import { ProductCategoryType } from "./product-category-type";

export interface ProductType {
  id?: number;
  product_category_id: number;
  name: string;
  description: string;
  categories?: ProductCategoryType;
}