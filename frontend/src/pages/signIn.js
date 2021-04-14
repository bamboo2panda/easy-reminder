import React from 'react';

import './signIn.css';

const SignIn = ({
                handleChangeEmail, 
                handleChangePass, 
                handleSubmit, 
                userPass, 
                userEmail
            }) => {
    return(
        <main class="form-signin">
            <form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" onChange={handleChangeEmail} value={userEmail} placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"  value={userPass} onChange={handleChangePass} placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>

                <button type='submit' value='CHECK' className="btn btn-success">Sing in</button>
            </form>
        </main>
    );
}

export default SignIn;