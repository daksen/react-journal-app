import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { registerWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    name: 'DakSen',
    email: 'email@gmail.com',
    password: 'test123',
    confirm: 'test123'
  });

  const { name, email, password, confirm } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid()) {
      dispatch(registerWithEmailPassword(name, email, password));
    }
  }

  const isFormValid = () => {
    if(name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if(!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password !== confirm) {
      dispatch(setError('Passwords do not match'));
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={ handleRegister }>
        <input 
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={ name }
          onChange={ handleInputChange }
        />
        <input 
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={ email }
          onChange={ handleInputChange }
        />
        <input 
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={ password }
          onChange={ handleInputChange }
        />
        <input 
          type="password"
          placeholder="Confirm password"
          name="confirm"
          className="auth__input"
          autoComplete="off"
          value={ confirm }
          onChange={ handleInputChange }
        />
        { 
          msgError && (
            <div className="auth__alert-error">
              { msgError }
            </div>
          )
        }
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>
      </form>
      <Link
        to="/auth/login"
        className="link"
      >
        Already registered?
      </Link>
    </div>
  );
}
