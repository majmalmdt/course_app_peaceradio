import axios from 'axios';
import config from './config.json';

export const forgotPassword = async (phone,countryCode,setMessage,setOpen) => {
    let data = new FormData();
    data.append('mobile', phone);
    data.append('country_code', countryCode);
   

    let apiCall = {
    method: 'post',
    url: `${config.API_URL}${config.FORGOT_PASSWORD_API_URI}`,
    headers: { 
    },
    data : data
    };

    axios.request(apiCall)
    .then((response) => {
        setMessage(response.data.data);
        setOpen(true);
    })
    .catch((error) => {
        setMessage(error.response.data.message)
        setOpen(true);});
}