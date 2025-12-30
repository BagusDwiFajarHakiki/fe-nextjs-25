"use client";

import Layout from "@/components/ui/Layout";
import { service } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, name: "Data Grid", description: "the Community version" },
  { id: 2, name: "Data Grid Pro", description: "the Pro version" },
  { id: 3, name: "Data Grid Premium", description: "the Premium version" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
];

export default function Page() {
  const [rows, setRows] = useState<any>([]);
  const getData = async () => {
    const response = await service("categories");
    if (!response.error) {
      setRows(response.data);
    }
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1 className="text-black">Product Category</h1>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
