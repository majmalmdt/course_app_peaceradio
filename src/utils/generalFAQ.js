import axios from 'axios';
import config from './config.json';

const getGeneralFAQ = async () => {
    try{
        let apiCall = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.GENERAL_FAQ}`,
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

export default getGeneralFAQ;