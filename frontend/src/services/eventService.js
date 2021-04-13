export default class EventService {
    constructor(token){
        this.token = token;
        this._apiBase = 'http://localhost:8000/api';
    }
    


    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': `Token ${this.token}`
            }});
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        console.log(res);
        return await res.json();
    };

    getEventsList = async (token) => {
        const res = await this.getResource(`/event/events/`);
        return res.map(this._transformEvent);
    };

    _transformEvent(event){
        return {
            name: event.name,
            date_time: event.date_time,
        };
    }
}