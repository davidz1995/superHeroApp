import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addHero, getByName, addVillain } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../redux/store'
//Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'

function Search() {

    const dispatch = useDispatch()
    const searchedHeroes = useSelector(state => state.getHeroByName)
    const teamHeroes = useSelector(state => state.heroes)
    const teamVillains = useSelector(state => state.villains)
  
    const [refresh, setRefresh] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const executeRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        },1000)
    }

    store.subscribe(executeRefresh)

    const handleAddHero = (e) => {
        e.preventDefault();
        if(teamHeroes.length < 3){
            dispatch(addHero(e.target.value))
            setShowResults(false)
        } else {
            alert('No puedes agregar mas de 3 heroes')
        }
    }

    const handleAddVillain = (e) => {
        e.preventDefault();
        if(teamVillains.length < 3){
            dispatch(addVillain(e.target.value))
            setShowResults(false)
        } else {
            alert('No puedes agregar mas de 3 villanos')
        }
    }

    const handleAddNeutral = (e) => {
        e.preventDefault();
        if(teamVillains.length < 3){
            dispatch(addVillain(e.target.value))
            setShowResults(false)
        } 
        else if(teamHeroes.length < 3){
            dispatch(addHero(e.target.value))
            setShowResults(false)
        }else {
            alert('No puedes agregar mas de 6 miembros al equipo')
        }
    }

   return (
        <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand style={{color:'black', fontSize:'2rem', fontWeight:'bold'}}>SuperHero App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                ></Nav>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().min(2, 'Debe tener mínimo 2 caracteres.')
                            .max(15, 'Puede tener maximo 15 caracteres.')
                            .required('Obligatorio'),
                    })}
                    async onSubmit={async(values) => {
                        dispatch(getByName(values.name))
                        setShowResults(true)
                    }}
                    >
                    <Form className="d-flex">
                        <Field name="name" type="text" placeholder='Busca un heroe o villano'/>
                        <ErrorMessage name="name" />
                        <Button type='submit' variant="outline-success">Buscar</Button>
                    </Form>
                </Formik>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div style={{
            position:'absolute',
            display:'flex', 
            zIndex:"1", 
            backgroundColor:'#F8F9FA', 
            width:'100%', 
            flexWrap:'wrap',
            paddingBottom:'2em',
            justifyContent:'center'
            }}>

        {showResults?
            <CloseButton style={{margin:'.5em'}} onClick={() => {setShowResults(false)}}/>
        :null
        }

        {Object.keys(searchedHeroes).length !== 0 && showResults?
            searchedHeroes.results?
            searchedHeroes.results.map((hero, index) => {
                return(
                    <div key={index}>
                    <Container>
                            <Col style={{
                                justifyContent:'center', 
                                marginTop:'4em', 
                                width:'max-content',
                                marginRight:'2em',
                                
                                }}>
                                <img style={{
                                    width:'8em', 
                                    maxHeight:'10em', 
                                    minHeight:'10em'
                                    }} src={hero.image.url} alt='SuperHero_image'/>
                                <div style={{
                                    display:'flex', 
                                    flexDirection:'column', 
                                    borderColor:'white', 
                                    borderStyle:'solid', 
                                    borderWidth:'1px',
                                    borderRadius:'5px',
                                    backgroundColor:'#F8F9FA',
                                    alignItems:'center'
                                    }}>
                                <h5 style={{fontSize:'2rem', width:'max-content'}}>{hero.name}</h5>

                                {hero.biography.alignment === 'good'?
                                    <Button variant="dark" 
                                            style={{width:'max-content'}} 
                                            value={hero.id} 
                                            onClick={handleAddHero}>
                                            Agregar
                                    </Button>
                                    : 
                                    null
                                }

                                {hero.biography.alignment === 'neutral' || hero.biography.alignment === '-'?
                                    <Button variant="dark" 
                                            style={{width:'max-content'}} 
                                            value={hero.id} 
                                            onClick={handleAddNeutral}>
                                            Agregar
                                    </Button>
                                    : 
                                    null
                                }

                                {hero.biography.alignment === 'bad'?
                                    <Button variant="dark" 
                                            style={{width:'max-content'}} 
                                            value={hero.id} 
                                            onClick={handleAddVillain}>
                                            Agregar
                                    </Button>
                                    : 
                                    null
                                }
                                </div>
                            </Col>
                    </Container>
                    </div>
                )
            })
            :
            <h3>Heroe no encontrado</h3>
            :null
        }
        </div>
        {refresh?null:null}
        </>
        
   );
}

export default Search
