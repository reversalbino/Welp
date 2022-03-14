import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';
import * as sessionActions from '../../store/session';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [loginForm, setLoginForm] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [credential, setCredential] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [validEmail, setValidEmail] = useState(undefined);

  useEffect(() => {

  }, [loginForm])

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password: loginPassword }))
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

  function userDemo() {
    dispatch(sessionActions.demo())
  }

  function reset() {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
    setName('');
    setCredential('');
    setLoginPassword('');
    setPasswordIsVisible(false);
  }

  function handleChange() {
    reset();
    setLoginForm(!loginForm);
  }

  useEffect(() => { }, [loginForm]);

  useEffect(() => {
    setLoginButtonDisabled(credential === '' || loginPassword === '');
  }, [credential, loginPassword])

  useEffect(() => {
    setSignupButtonDisabled(username === '' || password === '' ||
      confirmPassword === '' || password !== confirmPassword || name === '' ||
      password.length < 6);
  }, [username, password, confirmPassword, name])

  useEffect(() => {
    if (!loginForm) {
      let tempErrors = [];
      let bothInputs = document.getElementsByClassName('signup-password-div');
      let passwordInput = bothInputs[0];
      let confirmPasswordInput = bothInputs[1];

      if (!(password === confirmPassword)) {
        passwordInput.style.borderColor = 'red';
        confirmPasswordInput.style.borderColor = 'red';
        tempErrors.push(`Passwords don't match`);
      }
      else {
        if (password !== '') {
          passwordInput.style.borderColor = 'green';
          confirmPasswordInput.style.borderColor = 'green';
        }
      }

      if (password.length < 6 && password.length) {
        tempErrors.push('Password must be at least 6 characters long');
      }

      setPasswordErrors(tempErrors);
    }
  }, [password, confirmPassword])

  useEffect(() => {
    if(!loginForm) {
      let input = document.getElementById('password');
      let secondInput = document.getElementById('confirm-password');

      if (passwordIsVisible) {
        input.setAttribute('type', 'text');
      }
      else {
        input.setAttribute('type', 'password');
      }

      if (confirmPasswordIsVisible) {
        secondInput.setAttribute('type', 'text');
      }
      else {
        secondInput.setAttribute('type', 'password');
      }
    }
  }, [passwordIsVisible, confirmPasswordIsVisible]);

  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function validateEmail(mail) {
    if (checkEmail.test(mail)) {
      return (true)
    }
    return (false)
  }

  useEffect(() => {
    if (!loginForm) {
      setValidEmail(validateEmail(email));
      let emailInput = document.getElementById('email');
      if (!validEmail && email.length !== 0) {
        emailInput.style.borderColor = 'red';
      }
      else if (validEmail === true) {
        emailInput.style.borderColor = 'green';
      }
    }
  }, [email, validEmail])

  if (sessionUser) return <Redirect to="/" />;

  return (
    loginForm ? <>
      <p id='intro-text'>Log in to Welp</p>
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
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder='Password'
          // required
          />
        </label>
        <div id='login-button-and-signup-link'>
          <button type="submit"
            disabled={loginButtonDisabled}
            id='login-button'
          >
            Log In
          </button>
          <div id='new-sign-up'><p id='new-to-welp'>New to Welp?&nbsp;</p><p id='new-sign-up-button' onClick={() => handleChange()}>Sign up</p></div>
        </div>
        <button onClick={userDemo}>Demo User</button>
      </form>
    </>
    :
    <>
        <p id='intro-text'>Sign up for Welp</p>
        <form id='signup-form' onSubmit={handleSignupSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            <i className="fas fa-user icon"></i>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='First Name'
              className='not-password'
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
              className='not-password'
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
              className='not-password'
              id='email'
            // required
            />
          </label>
          {validEmail === false && email.length > 0 ? <p className='error'>Please enter a valid email</p> : <></>}
          <label className='password'>
            <i className="fas fa-key icon"></i>
            <div className='signup-password-div'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                id='password'
              // required
              />
              <button type='button' className='see-password' onClick={() => setPasswordIsVisible(!passwordIsVisible)}><i id='eye-icon' className="fa fa-eye icon" aria-hidden="true"></i></button>
            </div>
          </label>
          <label className='password'>
            <i className="fas fa-key icon"></i>
            <div className='signup-password-div'>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // onChange={e => handlePasswordChange(e)}
                placeholder='Confirm Password'
                id='confirm-password'
              // required
              />
              <button type='button' className='see-password' onClick={() => setConfirmPasswordIsVisible(!confirmPasswordIsVisible)}><i id='eye-icon' className="fa fa-eye icon" aria-hidden="true"></i></button>
            </div>
          </label>
          {/* {passwordsMatch === false ? <p className='error'>Passwords don't match</p> : <></>} */}
          {passwordErrors.map(error => {
            return <p className='error' key={error}>{error}</p>
          })}
          <div id='signup-button-and-login-link'>
            <button
              id='signup-button'
              type="submit"
              disabled={signupButtonDisabled}><i id='signup-lock-icon' className="fas fa-lock icon"></i>Sign Up</button>
            <div id='existing-log-in'><p>Already on Welp?&nbsp;</p><p id='log-in-text' onClick={() => handleChange()}>Log in</p></div>
          </div>
        </form>
    </>
  );
}

export default LoginForm;
