import axios from 'axios';
import config from './config.json';

const getUserData = async (mobileData,hash) => {
    let data = new FormData();
    data.append('mobile', mobileData.mobile);
    data.append('country_code', mobileData.countryCode);
    data.append('token',hash)
    try{
        let apiCall = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.GET_USER_DATA}`,
            data: data,
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

export default getUserData;