import React from 'react'
import Grid from './Grid'
import Search from './Search'
import { useEffect, useState } from 'react'
import Formulary from './Formulary'

function Home() {

    const [key, setKey] = useState('')

    useEffect(() => {
        setKey(localStorage.getItem('key'))
    },[]);

    return (
        <div>
        {key?
            <div>
                <Search/>
                <Grid/>
            </div>
            :
        <Formulary/>
        }
        </div>
    )
}

export default Home
