import React, {useState} from 'react';
import RegisterService from '../../services/registerService';
import {useHistory} from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [time_zone, setTimezone] = useState("");
    const history = useHistory();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeTimezone = (event) => {
        setTimezone(event.target.value);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        const registerService = new RegisterService();
        registerService.registerUser({email, password, name, time_zone})
        .then(() => {
                history.push("/");
            })
        .catch(() => {
                throw new Error("Registration fail.");
            });
    }

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleRegister}>
                <div class="mb-3">
                    <input type="email" name="email" value={email} onChange={handleChangeEmail} placeholder="your@email.com"/>
                </div>
                <div class="mb-3">
                    <input type="password" name="password" value={password} onChange={handleChangePassword} />
                </div>
                <div class="mb-3">
                    <input type="text" name="name" value={name} onChange={handleChangeName} placeholder="John"/>
                </div>
                <div class="mb-3">
                    <input type="text" name="time_zone" value={time_zone} onChange={handleChangeTimezone} placeholder="Europe/Moscow"/>
                </div>
                <button className="btn btn-success" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;