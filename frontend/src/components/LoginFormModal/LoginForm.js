import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState('');

  const [loginForm, setLoginForm] = useState(true);

  useEffect(() => {
    
  }, [loginForm])

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ name, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    loginForm ? <>
      <p id='intro-text'>Log in to Whelp</p>
      <form id='login-form' onSubmit={handleLoginSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <i className="fas fa-user icon"></i>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or email'
            // required
          />
        </label>
        <label>
          <i className="fas fa-key icon"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            // required
          />
        </label>
        <button type="submit" id='login-button'>Log In</button>
        <button onClick={() => setLoginForm(!loginForm)}>Sign Up</button>
      </form>
    </>
    :
    <>
      <p id='intro-text'>Sign up for Whelp</p>
      <form id='signup-form' onSubmit={handleSignupSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <i className="fas fa-envelope icon"></i>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='First Name'
          // required
          />
        </label>
        <label>
          <i className="fas fa-envelope icon"></i>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          // required
          />
        </label>
        <label>
          <i className="fas fa-user icon"></i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          // required
          />
        </label>
        <label>
          <i className="fas fa-key icon"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          // required
          />
        </label>
        <label>
          <i className="fas fa-key icon"></i>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Comfirm Password'
          // required
          />
        </label>
        <button id='signup-button' type="submit"><i id='signup-lock-icon' className="fas fa-lock icon"></i>Sign Up</button>
      </form>
    </>
  );
}

export default LoginForm;