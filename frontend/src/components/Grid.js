import React, {useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { store } from '../redux/store'
import {Link} from 'react-router-dom';
import { heroDetail, deleteById } from '../redux/actions/actions';
//Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import '../styles/grid.css'

function Grid() {

    const dispatch = useDispatch()

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

    return (
        <div className='container_cards'>
        {selectedHeroes.length?
            selectedHeroes.map((hero, index) => {
                return(
                    <div className='cards_superheroes' key={index}>
                            <Card style={{ width: 'max-content' }}>
                            <Card.Img variant="top" src={hero.image.url} style={{width:'15em', maxHeight:'20em'}}/>
                            <Card.Body>
                                <Card.Title style={{fontSize:'2rem', fontWeight:'bold'}}>{hero.name}</Card.Title>
                                <Card.Text style={{fontSize:'1rem'}}>
                                    Powerstats
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Intelligence: {hero.powerstats.intelligence} &nbsp;  &nbsp;  Strength: {hero.powerstats.strength}</ListGroupItem>
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Speed: {hero.powerstats.speed} &nbsp; &nbsp;  Durability: {hero.powerstats.durability}</ListGroupItem>
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Power: {hero.powerstats.power} &nbsp; &nbsp;  Combat: {hero.powerstats.combat}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Link to='/'><Button style={{marginRight:'1em'}} variant="danger" onClick={() => {dispatch(deleteById(hero.id))}}>Eliminar</Button></Link>
                                <Link to='/detail'><Button variant="dark" onClick={() => {dispatch(heroDetail(hero.id))}}>Detalle</Button></Link>
                            </Card.Body>
                            </Card>
                    </div>
                )})
            :
            null
            }
        {selectedVillains.length?
            selectedVillains.map((villain, index) => {
                return(
                    <div className='cards_superheroes' key={index}>
                        <Card style={{ width: 'max-content' }}>
                            <Card.Img variant="top" src={villain.image.url} style={{width:'15em', maxHeight:'20em'}}/>
                            <Card.Body>
                                <Card.Title style={{fontSize:'2rem', fontWeight:'bold'}}>{villain.name}</Card.Title>
                                <Card.Text>
                                Powerstats
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Intelligence: {villain.powerstats.intelligence} &nbsp;  &nbsp;  Strength: {villain.powerstats.strength}</ListGroupItem>
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Speed: {villain.powerstats.speed} &nbsp; &nbsp;  Durability: {villain.powerstats.durability}</ListGroupItem>
                                <ListGroupItem style={{fontSize:'1rem', fontWeight:'500'}}>Power: {villain.powerstats.power} &nbsp; &nbsp;  Combat: {villain.powerstats.combat}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Link to='/'><Button style={{marginRight:'1em'}} variant="danger" onClick={() => {dispatch(deleteById(villain.id))}}>Eliminar</Button></Link>
                                <Link to='/detail'><Button variant="dark" onClick={() => {dispatch(heroDetail(villain.id))}}>Detalle</Button></Link>
                            </Card.Body>
                            </Card>
                </div>
            )})
            :
            null
        }
        {refresh?null:null}
        </div>
    )
}

export default Grid
