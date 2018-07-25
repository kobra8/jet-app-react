import axios from 'axios';

const token = '************'
const API = axios.create({
  baseURL:'https://api.airtable.com/v0/appIq168JTRRRu6TO/Imported%20table',
})
API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default API;