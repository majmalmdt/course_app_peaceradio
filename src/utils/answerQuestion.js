import axios from 'axios';
import config from './config.json';
const answerQuestion = async ( courseId, userId, optionId,module_id,course_id,module_type) => {
    let data = new FormData();
    data.append('course_question_id', courseId);
    data.append('course_candidate_id', userId );
    data.append('option_id', Number(optionId));
    data.append("module_id",module_id)
    data.append("course_id",course_id)
    data.append('module_type',module_type)
    const res = await axios({
        method: "post",
        url: `${config.API_URL}${config.ANSWER_API_URI}`,
        data: data,
        headers: { 
            "Content-Type": "multipart/form-data", 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
         },
    })
    return res.data;
}

export default answerQuestion;