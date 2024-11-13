import axios from 'axios';
import config from './config.json';

const checkUser = async (mobileData) => {
    let data = new FormData();
    data.append('mobile', mobileData.mobile);
    data.append('country_code', mobileData.countryCode);
    try{
        let apiCall = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.CHECK_USER}`,
            data: data,
            headers: { 
                'Accept': 'application/json', 
            }
        };
        
        const response = await axios.request(apiCall)
            return (response.data)
    }
    catch(error){
            throw error;    
    }
}

export default checkUser;