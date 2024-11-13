import axios from 'axios';
import config from './config.json';
const courseEntroll = async ( courseId, userId) => {
    let data = new FormData();
    data.append('course_candidate_id', userId);
    data.append('course_master_id', courseId);
    const res = await axios({
        method: "post",
        url: `${config.API_URL}${config.ENTROLL_API_URI}`,
        data: data,
        headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
         },
    })
    return res.data;
}

export default courseEntroll;