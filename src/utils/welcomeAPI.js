import axios from 'axios';
import config from './config.json';

const welcomeAPI = async () => {
    try{
        let apiCall = {
            method: 'get',
            url: `${config.API_URL}${config.WELCOME_API}`,
            headers: { 
                'Accept': 'application/json', 
            }
        };
        
        const response = await axios.request(apiCall)
            return (response.data)
    }
    catch(error){
        console.log(error)
        throw error;    
    }
}

export default welcomeAPI;