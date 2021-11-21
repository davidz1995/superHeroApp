import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { store } from '../redux/store'
import { Link } from 'react-router-dom';
import Formulary from './Formulary';
//Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function DetailHero() {

    const [key, setKey] = useState('')

    useEffect(() => {
        setKey(localStorage.getItem('key'))
    },[setKey]);

    const hero = useSelector(state => state.heroDetail)

    const [refresh, setRefresh] = useState(false)
    const [show, setShow] = useState(false)

    const executeRefresh = () => {
        setRefresh(true)
        setShow(true)
        setTimeout(() => {
            setRefresh(false)
        },1000)
    }

    store.subscribe(executeRefresh)

    return (
        <>
        {key?
            <div style={{height:'max-content', backgroundColor:'black'}}>
            <Link to='/' style={{position:'absolute', left:'1em', top:'1em'}}><Button variant="light">Home</Button></Link>
            {hero && show?
                <Container style={{paddingTop:'7%', paddingBottom:'10%'}}>
                    <Row>
                        <Col>
                            <img src={hero.image.url} alt='hero_image' style={{
                                width:'20em', 
                                borderRadius:'5px',
                                borderStyle:'solid', 
                                borderColor:'white', 
                                borderWidth:'1px'
                                }}/>
                        </Col>
                        <Col style={{color:'white',paddingTop:'5%', fontSize:'1.3rem'}}>
                                <h1 style={{fontSize:'2rem', fontWeight:'bold'}}>{hero.name}</h1>
                                <p >Peso: {hero.appearance.weight[0]}</p>
                                <p>Altura: {hero.appearance.height[0]}</p>
                                <p>Alias: {hero.biography.aliases[0]}</p>
                                <p style={{textTransform:'capitalize'}}>Color de ojos: {hero.appearance['eye-color']}</p>
                                <p style={{textTransform:'capitalize'}}>Color de cabello: {hero.appearance['hair-color']}</p>
                                <p style={{width:'95%'}}>Lugar de trabajo: {hero.work.base}</p>
                        </Col>
                    </Row>
                </Container>
                :
                null
            }
        </div>
        :
        <Formulary/>
        }
        {refresh?null:null}
    </>
    )
}

export default DetailHero
