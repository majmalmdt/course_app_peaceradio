import axios from 'axios';
import config from './config.json';

const coursePlaylistFetch = async (courseId) => {
    try{
        let apiCall = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${config.API_URL}${config.COURSE_PLAYLIST_API_URI}${courseId}`,
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
        }        throw error;    
    }
}

export default coursePlaylistFetch;