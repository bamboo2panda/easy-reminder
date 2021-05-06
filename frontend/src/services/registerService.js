require('dotenv').config()
const { REACT_APP_WEB_HOST } = process.env;

export default class RegisterService {
    _apiBase = `http://${REACT_APP_WEB_HOST}:8000/api/user/create/`;
    
    registerUser = async(data) => {
        if (!data.email || !data.password || !data.name || !data.time_zone){
            throw new Error('No data');
        }
        const res = await fetch(`${this._apiBase}`,{
            method: 'POST',
            crossDomain: true,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            }
        );
        if (!res.ok){
            throw new Error('Bad registration');
        }
        return await res.json();
    }
}