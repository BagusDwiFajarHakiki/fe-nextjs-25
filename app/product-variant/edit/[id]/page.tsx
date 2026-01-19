"use client";

import Layout from "@/components/ui/Layout";
import { serviceShow, serviceUpdate } from "@/services/services";
import { Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

export default function ProductCategoryEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isError, setIsError] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState({
    product_category_id: "",
    product_id: "",
    name: "",
    price: "",
    stock: "",
  });

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const getProductCategory = useCallback(async () => {
    setFetching(true);
    const response = await serviceShow("variants", id);
    if (!response.error) {
      setFormValues({
        product_category_id: response.data.product_category_id,
        product_id: response.data.product_id,
        name: response.data.name,
        price: response.data.price,
        stock: response.data.stock,
      });
    } else {
      toast.error(response.message);
    }
    setFetching(false);
  }, [id]);

  useEffect(() => {
    getProductCategory();
  }, [getProductCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError((prevError) => ({ ...prevError, [name]: false }));
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = new FormData(e.currentTarget);

      const response = await serviceUpdate("variants", submitData, id);
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

  if (fetching) {
    return (
      <Layout>
        <div className="flex justify-center h-96">
          <p className="text-black text-md font-bold text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-black text-2xl font-bold">Product Variant Edit</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField
            error={isError.product_category_id}
            onChange={handleChange}
            name="product_category_id"
            id="product_category_id"
            label="Product Category ID"
            variant="standard"
            value={formValues.product_category_id}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.product_id}
            onChange={handleChange}
            name="product_id"
            id="product_id"
            label="Product ID"
            variant="standard"
            value={formValues.product_id}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.name}
            onChange={handleChange}
            name="name"
            id="name"
            label="Name"
            variant="standard"
            value={formValues.name}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.price}
            onChange={handleChange}
            name="price"
            id="price"
            label="Price"
            variant="standard"
            value={formValues.price}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            error={isError.stock}
            onChange={handleChange}
            name="stock"
            id="stock"
            label="Stock"
            variant="standard"
            value={formValues.stock}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
