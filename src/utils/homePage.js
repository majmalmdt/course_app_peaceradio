import axios from 'axios';
import config from './config.json';


const homePage = async ()=>{
    try{
    let apiCall = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${config.API_URL}${config.HOME_API_URI}`,
    headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
    }
    };

    const response = await axios.request(apiCall)
        return (response.data)
    }
    catch(error){
        if(error.response.status===401){
            localStorage.removeItem('token')
        }
        return null
    }
}
export default homePage