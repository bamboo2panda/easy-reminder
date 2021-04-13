import {Component} from 'react';

export default class AuthService extends Component {
    _apiBase = `http://localhost:8000/api/user/token/`;

    authenticateUser = async (data) => {
        console.log(data);
        const res = await fetch(
            `${this._apiBase}`,{
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            }
        );
        if(!res.ok){
            throw new Error(`Bad authentication`);
        }
        return await res.json();
    }
}