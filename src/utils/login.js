import axios from 'axios';
import config from './config.json';

export const login = async (phone,countryCode,password,setMessage,setOpen,navigate) => {
    let data = new FormData();
    data.append('mobile', phone);
    data.append('country_code', countryCode);
    data.append('password', password);

    let apiCall = {
    method: 'post',
    url: `${config.API_URL}${config.LOGIN_API_URI}`,
    headers: { 
    },
    data : data
    };

    axios.request(apiCall)
    .then((response) => {
    if(response.data.status){
        console.log(response.data.data.token);
        localStorage.setItem('token', response.data.data.token);
        navigate('/');
    } else{ setMessage(response.data.message);
        setOpen(true);
    }
    })
    .catch((error) => {setMessage(error.response.data.message)
        setOpen(true);});
}