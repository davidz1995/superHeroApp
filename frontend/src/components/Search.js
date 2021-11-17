import React, {useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addHero, getByName } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from '../redux/store'

function Search() {

    const dispatch = useDispatch()
    const searchedHeroes = useSelector(state => state.getHeroByName)
  
    const [refresh, setRefresh] = useState(false)

    const executeRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        },1000)
    }

    store.subscribe(executeRefresh)

    const handleAddHero = (e) => {
        e.preventDefault();
        dispatch(addHero(e.target.value))
    }

   return (
        <>
        <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
            name: Yup.string().min(2, 'Must be 2 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        })}
        async onSubmit={async(values) => {
            dispatch(getByName(values.name))
        }}
        >
        <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text"/>
            <ErrorMessage name="name" />
    
            <button type="submit">Submit</button>
        </Form>
        </Formik>

        {Object.keys(searchedHeroes).length !== 0?
            searchedHeroes.results?
            searchedHeroes.results.map((hero, index) => {
                return(
                    <div id={index}>
                    <Container>
                        <Row>
                            <Col xs={15}>
                            <h2>{hero.name}</h2>
                            <img style={{width:'4em'}} src={hero.image.url} alt='SuperHero_image'/>
                            <button value={hero.id} onClick={handleAddHero}>Add to team</button>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                )
            })
            :
            <h3>Hero not found</h3>
            :null
        }
        {refresh?null:null}
        </>
        
   );
}

export default Search
