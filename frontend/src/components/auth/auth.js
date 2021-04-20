import React, {useState} from 'react';
import AuthService from '../../services/authService';
import SignIn from '../../pages/signIn';

const Auth = (props) => {
    const [userEmail, updateUserEmail] = useState("");
    const [userPass, updateUserPass] = useState("");

    const token = localStorage.getItem('token');

    if (token){
        return props.children;
    }

    const authService = new AuthService();

    const handleSubmit = (event) => {
        event.preventDefault();
        authService.authenticateUser({
            email: userEmail,
            password: userPass
        })
        .then((result) => {
            if (result.token){
                props.setToken(result.token);
                updateUserEmail(null);
                updateUserPass(null);
            }
        });
        
    }
    const handleChangeEmail = (event) => {
        updateUserEmail(event.target.value);
    }
    const handleChangePass = (event) => {
        updateUserPass(event.target.value);
    }

    return <SignIn 
                handleChangeEmail={handleChangeEmail}
                handleChangePass={handleChangePass}
                userEmail={userEmail}
                userPass={userPass}
                handleSubmit={handleSubmit}
            />
}

export default Auth;