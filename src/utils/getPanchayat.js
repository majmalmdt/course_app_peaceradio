import axios from 'axios';
import config from './config.json';

const getPanchayat = async (district_id) => {
    try{
        let apiCall = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.GET_PANCHAYAT}${district_id}`,
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

export default getPanchayat;