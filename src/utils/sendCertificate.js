import axios from 'axios';
import config from './config.json';

const sendCertificate = async (course_id) => {
    try{
        let apiCall = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.SEND_CERTIFICATE}/${course_id}`,
            headers: { 
                'Accept': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
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

export default sendCertificate;