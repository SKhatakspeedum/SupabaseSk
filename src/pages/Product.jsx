import React from 'react'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'


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
    return (
        <div>
          {smoothies && (
            <div>
                {smoothies.map(smoothie=>(
                    <p key={smoothie.id}>{smoothie.title}</p>
                ))}
            </div>
          )}
          {
            fetchError && (
                <p>{fetchError}</p>
            )
          }
        </div>
    )
}

export default Product
