import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'
import ProductCard from './ProductCard'


const Product = () => {
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)
    
    useEffect(()=>{
        const fetchProducts=async()=>{
            const {data,error}=await supabase.from("Product").select('*');
            if(error){
                console.log("error :>>",error);

                setFetchError(error)
                setSmoothies(null)
            }
            if(data){
                console.log("data :>>",data);
                setSmoothies(data)
                setFetchError(null)
            }
            
        }
        fetchProducts();
    },[])
    const handleDelete = (id) => {
        setSmoothies(prevSmoothies => {
            return prevSmoothies.filter(sm => sm.id !== id)
        })
    }

    return (
        <div className="page">
          <div className="section-header">
            <h2>Products</h2>
            <Link to="/create" className="btn-add-product">
                <span>➕</span> Add Product
            </Link>
          </div>
          {smoothies && (
            <div className="smoothie-grid">
                {smoothies.map(smoothie=>(
                     <ProductCard 
                        key={smoothie.id} 
                        product={smoothie}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
          )}
          {fetchError && (<p>{fetchError}</p>)}
        </div>
    )
}

export default Product
