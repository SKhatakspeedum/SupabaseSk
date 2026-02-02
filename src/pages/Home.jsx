import React, { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Home = () => {
    console.log(supabase);
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
