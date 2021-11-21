import React, { useEffect, useState } from 'react'
import Formulary from './Formulary'
import Stats from './Stats'
import Grid from './Grid'
import Search from './Search'
import '../styles/home.css'

function Home() {

    const [key, setKey] = useState('')

    useEffect(() => {
        setKey(localStorage.getItem('key'))
    },[]);

    return (
        <div className='home'>
        {key?
            <div className='subcontainer_home'>
                <Search/>
                <Stats/>
                <Grid/>
            </div>
            :
        <Formulary/>
        }
        </div>
    )
}

export default Home
