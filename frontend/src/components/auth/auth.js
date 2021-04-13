import React, {useState} from 'react';
import AuthService from '../../services/authService';

const Auth = (props) => {
    const {token} = props;
    const [userEmail, updateUserEmail] = useState(null);
    const [userPass, updateUserPass] = useState(null);

    console.log(props);
    if (token){
        return props.children;
    }

    const authService = new AuthService();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userEmail + userPass);
        authService.authenticateUser({
            email: userEmail,
            password: userPass
        })
        .then((result) => {
            console.log(result.token);
            if (result.token){
                props.updateToken(result.token);
            }
        });
        
    }
    const handleChangeEmail = (event) => {
        updateUserEmail(event.target.value);
    }
    const handleChangePass = (event) => {
        updateUserPass(event.target.value);
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={userEmail} onChange={handleChangeEmail}/>
            <br/>
            <input type='password' value={userPass} onChange={handleChangePass}/>
            <br/>
            <input type='submit' value='CHECK'/>
        </form>
    )
}

export default Auth;