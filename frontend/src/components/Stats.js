import React, {useState } from 'react';
import { store } from '../redux/store';
import {useSelector} from 'react-redux';
//Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/stats.css'

function Stats() {

    const [refresh, setRefresh] = useState(false)

    const executeRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        },1000)
    }

    store.subscribe(executeRefresh)

    const selectedHeroes = useSelector(state => state.heroes)
    const selectedVillains = useSelector(state => state.villains)

    let strengthHeroes = selectedHeroes.map(hero => +hero.powerstats.strength)
    let strengthVillains = selectedVillains.map(villain => +villain.powerstats.strength)
    let totalStrength = [...strengthHeroes, ...strengthVillains]
    
    let intelligenceHeroes = selectedHeroes.map(hero => +hero.powerstats.intelligence)
    let intelligenceVillains = selectedVillains.map(villain => +villain.powerstats.intelligence)
    let totalIntelligence = [...intelligenceHeroes, ...intelligenceVillains]

    let speedHeroes = selectedHeroes.map(hero => +hero.powerstats.speed)
    let speedVillains = selectedVillains.map(villain => +villain.powerstats.speed)
    let totalSpeed = [...speedHeroes, ...speedVillains]

    let powerHeroes = selectedHeroes.map(hero => +hero.powerstats.power)
    let powerVillains = selectedVillains.map(villain => +villain.powerstats.power)
    let totalPower = [...powerHeroes, ...powerVillains]

    let heightHeroes = selectedHeroes.map(hero => parseInt(hero.appearance.height[1].split(' ').slice(0, 1)+''))
    let heightVillains = selectedVillains.map(villain => parseInt(villain.appearance.height[1].split(' ').slice(0, 1)+''))
    let totalHeight = [...heightHeroes, ...heightVillains]

    let weightHeroes = selectedHeroes.map(hero => parseInt(hero.appearance.weight[1].split(' ').slice(0, 1)+''))
    let weightVillains = selectedVillains.map(villain => parseInt(villain.appearance.weight[1].split(' ').slice(0, 1)+''))
    let totalWeight = [...weightHeroes, ...weightVillains]

    return (
        <div className='container_stats'>
        {selectedHeroes.length?
            <Container>
            <Row>
                <Col>
                    <h3>Altura</h3>
                    <p>{totalHeight.reduce((previousValue, currentValue) => previousValue + currentValue)/totalHeight.length}</p>
                </Col>
                <Col>
                    <h3>Peso</h3>
                    <p>{totalWeight.reduce((previousValue, currentValue) => previousValue + currentValue)/totalWeight.length}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Inteligencia:</h3>
                    <p>{totalIntelligence.reduce((previousValue, currentValue) => previousValue + currentValue)}</p>
                </Col>
                <Col>
                    <h3>Fuerza:</h3>
                    <p>{totalStrength.reduce((previousValue, currentValue) => previousValue + currentValue)}</p>
                </Col>
                <Col>
                    <h3>Speed:</h3>
                    <p>{totalSpeed.reduce((previousValue, currentValue) => previousValue + currentValue)}</p>
                </Col>
                <Col>
                    <h3>Power:</h3>
                    <p>{totalPower.reduce((previousValue, currentValue) => previousValue + currentValue)}</p>
                </Col>
            </Row>
        </Container>
        : null
        }   
        {refresh?null:null}
        </div>
    )
}

export default Stats
