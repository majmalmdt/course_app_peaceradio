import axios from 'axios';
import config from './config.json';
const deleteMember = async (userId) => {
    try{
    let data = new FormData()
    const res = await axios({
        method: "get",
        url:  `${config.API_URL}${config.DELETE_MEMBER}/${userId}`,
        data: data,
        headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
         },
    })
    return res.data;
    }
    catch(error){
        if(error.response.status===401){
            localStorage.removeItem('token')
        }
        return error.response.data;
    }
}

export default deleteMember;