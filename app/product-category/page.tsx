import Layout from "@/components/ui/Layout";
import { service } from '@/services/services';
import React, { useEffect } from 'react';

export default function Page() {
  const getData = async () => {
    const response = await service('product-category');
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1 className="text-black">
        Product Category
      </h1>
    </Layout>
  )
}