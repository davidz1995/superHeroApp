import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button'
import * as Yup from 'yup';
 
 const Formulary = () => {

    const POST_DATA = (email, password) => {
      axios.post(`http://challenge-react.alkemy.org/`, { email, password })
      .then(response => {
        if(response.status === 200){
            return response.data
        }
     })
     .then(data => {
        localStorage.setItem('key', data.token);
        window.location.href = '/'
        }
     )
     .catch((error) => alert('Usuario no autorizado. Intenta nuevamente.'));
    }

   return (
     <div style={{
        height:'100vh', 
        width:'100%',
        textAlign:'-webkit-center'
        }}>

      <h1 style={{
        color:'white',
        fontSize:'5rem',
        paddingTop:'8%',
        marginBottom:'.5em',
        fontWeight:'bold'
      }}>
        SuperHero App
      </h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validationSchema={Yup.object({
        email: Yup.string().email('Email inválido').required('Obligatorio'),
        password: Yup.string()
            .min(2, 'Debe tener por lo menos 2 caracteres.')
            .max(15, 'Debe tener máximo 15 caracteres.')
            .required('Obligatorio'),
       })}
       onSubmit={(values) => {
        POST_DATA(values.email, values.password)
       }}
     >
       <Form style={{
          backgroundColor:'white', 
          width:'20em', height:'15em',
          display:'flex', 
          flexDirection:'column',
          borderRadius:'10px',
          alignItems:'center',
          justifyContent:'center',
          borderWidth:'2px',
          borderStyle:'solid',
          borderColor:'#90FB2A'
         }}>
          <label htmlFor="email" style={{
            fontSize:'1.3rem', 
            fontWeight:'bold', 
            marginBottom:'.5em'}}>
            Email
          </label>
          <Field name="email" type="email" style={{
            borderRadius:'5px',
            borderStyle:'solid',
            borderWidth:'1px'
            }}/>
          <ErrorMessage name="email" />

          <label htmlFor="password" style={{
            fontSize:'1.3rem', 
            fontWeight:'bold', 
            marginBottom:'.5em',
            marginTop:'.5em'
            }}>
            Contraseña
          </label>
          <Field name="password" type="password" style={{
            borderRadius:'5px',
            borderStyle:'solid',
            borderWidth:'1px'
            }}/>
          <ErrorMessage name="password" />

          <Button variant="outline-primary" type='submit' style={{marginTop:'1em'}}>Entrar</Button>
        </Form>
      </Formik>
      </div>
   );
 };

 export default Formulary
 