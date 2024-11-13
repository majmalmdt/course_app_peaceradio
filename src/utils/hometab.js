import axios from 'axios';
import config from './config.json';

const homeTabFetch = async (courseId,userId) => {
    const res = await axios({
        method: "get",
        url: `${config.API_URL}${config.HOMETAB_API_URI}${courseId}?course_candidate_id=${userId}`,
        headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
    },
    })
    console.log(res.data);
    return res.data;
}

export default homeTabFetch