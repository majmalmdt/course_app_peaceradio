import axios from 'axios';
import config from './config.json';

const moduleTabFetch = async (module_no,courseId) => {
    const res = await axios({
        method: "get",
        url: `${config.API_URL}${config.MODULETAB_API_URI}${module_no}?course_candidate_id=${courseId}`,
        headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
    },
    })
    return res.data;
}

export default moduleTabFetch