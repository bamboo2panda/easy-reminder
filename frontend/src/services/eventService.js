export default class EventService {
   
    constructor(){
        this._apiBase = 'http://localhost:8000/api/event/events';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': 'Token 2f461b2833caa6acf4a659eb8b342eec94de2269'
            }});

        
        
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        console.log(res);
        return await res.json();
    };

    getEventsList = async () => {
        const res = await this.getResource(`/`);
        return res.map(this._transformEvent);
    };

    _transformEvent(event){
        return {
            name: event.name,
            date_time: event.date_time,
        };
    }
}