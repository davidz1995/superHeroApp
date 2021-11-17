import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
     .catch((error) => alert('Failed to authenticate: User not found'));
    }

   return (
     <Formik
       initialValues={{ email: '', password: '' }}
       validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(2, 'Must be 2 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
       })}
       onSubmit={(values) => {
        POST_DATA(values.email, values.password)
       }}
     >
       <Form>
         <label htmlFor="email">Email Address</label>
         <Field name="email" type="email"/>
         <ErrorMessage name="email" />
 
         <label htmlFor="password">Password</label>
         <Field name="password" type="text"/>
         <ErrorMessage name="password" />
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
   );
 };

 export default Formulary
 