import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';


import * as Yup from 'yup';
import axios from 'axios';

import avatar from '../assets/avatar3.png';

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    console.log("Status:", status)
    status && setUser(users =>
      [...users, status])
  }, [status]);


  return (
    <div className='form-container'>
      <div className='img-container'>
        <img src={avatar} alt="Avatar" class="avatar"></img>
      </div>

      <div className='form-signup'>
        <Form>
          <Field type='text' name='name' autocomplete='off' placeholder='Name:' />
          {touched.name && errors.name && (
            <p className='errors'>{errors.name}</p>
          )}
          <Field type='email' name='email' autocomplete='off' placeholder='Email:' />
          {touched.email && errors.email && (
            <p className='errors'>{errors.email}</p>
          )}
          <Field type='password' name='password' placeholder='Password:' />
          {touched.password && errors.password && (
            <p className='errors'>{errors.password}</p>
          )}
          <label htmlFor="checkbox">Terms Of Service</label>
          <Field type="checkbox" checked={values.tos} name='tos' />

          <button type='submit' disabled={values.isSubmitting}>
            {values.isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </Form>
      </div>
      <div >
        <div className="user-list">
          {users.map(list => (
            <div className="card" key={list.id}>
              <h2>Name: {list.name}</h2>
              <h2>Email: {list.email}</h2>
              <h2>Password: {list.password}</h2>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    name: '',
    email: '',
    password: '',
    TermsOfService: false
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Your Full Name is a required!"),

    email: Yup.string()
      .email("Email must be valid.")
      .required("Must include email."),
    password: Yup.string().required().min(2, "TOO SHORT").max(10, "Needs to be shorter"),
    tos: Yup.boolean().oneOf([true], "Please check box.")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        console.log('Submitted Successfully', response);
        resetForm();
        setStatus(response.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

