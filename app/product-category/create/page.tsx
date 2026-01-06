"use client";

import TextField from '@mui/material/TextField';
import Layout from '@/components/ui/Layout'
import React from 'react'
import { Button } from '@mui/material';

export default function ProductCategoryCreate() {
  return (
    <Layout>
        <h1 className="dark:text-black text-2xl font-bold my-4">Product Category Create</h1>
        <form action="" className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <TextField
                    id="standard-basic"
                    label="Name" 
                    variant="standard" 
                />
                <TextField
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Standard 3"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Standard 4"
                    variant="standard"
                />
            </div>

            <Button
                variant="contained"
            >
            Submit
            </Button>
        </form>
    </Layout>
  )
}
