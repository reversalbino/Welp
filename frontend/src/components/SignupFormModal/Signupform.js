// import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// // import './LoginForm.css';

// function SignupForm() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);
//     const [credential, setCredential] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState([]);

//     if (sessionUser) return (
//         <Redirect to="/" />
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors([]);
//         return dispatch(sessionActions.login({ credential, password }))
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) setErrors(data.errors);
//             });
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <label>
//                 Username or Email
//                 <input
//                     type="text"
//                     value={credential}
//                     onChange={(e) => setCredential(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Password
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Log In</button>
//         </form>
//     );
// }

// export default SignupForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
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
        <>
            <p id='intro-text'>Sign up for Whelp</p>
            <form id='signup-form' onSubmit={handleSubmit}>
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

export default SignupFormPage;