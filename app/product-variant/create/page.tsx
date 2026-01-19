"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceStore } from "@/services/services";
import { Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductCategoryType } from "@/services/data-types/product-category-type";
import { ProductType } from "@/services/data-types/product-type";
import { toast } from "react-toastify"; // jalan / install terlebih dahulu: npm install react-toastify, tambahkan <ToastContainer /> pada app/layout.tsx
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProductVariantCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<ProductCategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const response = await service("categories");
      if (!response.error) {
        setCategories(response.data);
      }
    };
    getCategories();
    
    const getProducts = async () => {
      const response = await service("products");
      if (!response.error) {
        setProducts(response.data);
      }
    };
    getProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError((prevError) => ({ ...prevError, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = new FormData(e.currentTarget);

      const response = await serviceStore("variants", submitData);
      if (response.error) {
        if (response.message == "Token has expired") {
          Cookies.remove("token");
          router.push("/");
        } else if (response.message) {
          if (typeof response.message === "object") {
            Object.entries(response.message).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                setIsError((prevError) => ({ ...prevError, [key]: true }));
                toast.error(value[0]);
              }
            });
          } else {
            toast.error(response.message);
          }
        }
      } else {
        toast.success(response.message);
        router.push("/product-variant");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-black text-2xl font-bold">Product Variant Create</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField
            select
            error={isError.product_category_id}
            onChange={handleChange}
            name="product_category_id"
            id="product_category_id"
            label="Product Category"
            variant="standard"
            defaultValue=""
            SelectProps={{
                native: false,
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            error={isError.product_id}
            onChange={handleChange}
            name="product_id"
            id="product_id"
            label="Product"
            variant="standard"
            defaultValue=""
            SelectProps={{
                native: false,
            }}
          >
            {products.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={isError.name}
            onChange={handleChange}
            name="name"
            id="name"
            label="Name"
            variant="standard"
          />
          <TextField
            error={isError.price}
            onChange={handleChange}
            name="price"
            id="price"
            label="Price"
            variant="standard"
          />
          <TextField
            error={isError.stock}
            onChange={handleChange}
            name="stock"
            id="stock"
            label="Stock"
            variant="standard"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="contained" loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
