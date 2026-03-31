import React, { useEffect, useState } from 'react'
import ProductsCard from '../components/ProductsCard'

const ProductList = () => {
    

    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL 

    useEffect(()=>{
        fetch(`${BASEURL}/api/products/`)
        .then((response)=>{
            if(!response.ok){
                throw new Error('Failed to fetch products')
            }
            return response.json()
        })
        .then((data)=>{
            setProducts(data)
            setLoading(false)
        })
        .catch((error)=>{
            setError(error.message)
            setLoading(false)
        })
    },[])

    if(loading){
        return <p>Loading products...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

  return (
   <div className='min-h-screen bg-gray-100 '>
        <h1 className='text-3xl font-bold text-center py-6 bg-white shadow-md'>Product List</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-6 p-6'>
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))
            ):
            <p className='text-center  col-span-full'>No Product Available!</p>
            }
        </div>
   </div>
  )
}

export default ProductList


