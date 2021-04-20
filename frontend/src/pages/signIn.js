import React from 'react';
import {Link} from 'react-router-dom';

import './signIn.css';

const SignIn = ({
                handleChangeEmail, 
                handleChangePass, 
                handleSubmit, 
                userPass, 
                userEmail
            }) => {
    return(
        <main className="form-signin">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" onChange={handleChangeEmail} value={userEmail} placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"  value={userPass} onChange={handleChangePass} placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="row row-cols-2">
                    <div className="col">
                        <button type='submit' value='CHECK' className="btn btn-success">Sing in</button>
                    </div>
                    <div className="col">
                        <Link className="btn btn-primary" to="/register">Register</Link>
                    </div>
                </div>
                
            </form>
        </main>
    );
}

export default SignIn;