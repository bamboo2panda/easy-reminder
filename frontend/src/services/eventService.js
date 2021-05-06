require('dotenv').config();
console.log(require('dotenv'));
const host = process.env.REACT_APP_WEB_HOST;
console.log(`Host: ${host}`);
const protocol = 'http://';
export default class EventService {
    constructor(){
        this.token = localStorage.getItem("token");
        this._apiBase = `${protocol}${host}:8000/api`;
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
        return await res.json();
    };

    getEventsList = async () => {
        const res = await this.getResource(`/event/events/`);
        return res.map(this._transformEvent);
    };

    addEvent = async (data) => {
        console.log(this.token);
        console.log(data);
        if (!data.name || !data.date_time){
            throw new Error('No data');
        }
        const url = `/event/events/`;
        const res = await fetch(`${this._apiBase}${url}`,{
            method: "POST",
            crossDomain: true,
            headers:{
                'accept': 'application/json, plain/text, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok){
            console.log(res);
            throw new Error("Bad new event request.");
        }
        return await res.json();
    }

    updateEvent = async (id, data) => {
        const url = `/event/events/`;
        const res = await fetch(`${this._apiBase}${url}${id}/`,{
            method: "PATCH",
            crossDomain: true,
            headers:{
                'accept': 'application/json, plain/text, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok){
            console.log(res);
            throw new Error("Bad update event request.");
        }
        return await res.json();
    }

    deleteEvent = async (id) => {
        if (!id) {
            throw new Error("No event selected.");
        }
        const url = '/event/events/';
        const res = await fetch(`${this._apiBase}${url}${id}/`,{
            method: "DELETE",
            crossDomain: true,
            headers: {
                'accept': 'application/json, plain/text, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.token}`
            }
        });
        if(!res.ok){
            console.log(res);
            throw new Error('Bad deletion try.');
        }
        return await res;
    }


    _transformEvent(event){
        return {
            id: event.id,
            name: event.name,
            date_time: event.date_time,
        };
    }
}