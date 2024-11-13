import axios from 'axios';
import config from './config.json';

const answerSubmit = async (answer, userId, module_id, course_id, module_type) => {
    let data = new FormData();
    
    answer.map((ans, ind) => (
        data.append(`answer[${[ind]}][course_question_id]`, ans.course_question_id)
    ));
    data.append("course_candidate_id", userId);
    answer.map((ans, ind) => (
        data.append(`answer[${[ind]}][option_id]`, Number(ans.option_id))
    ));
    data.append('module_id', module_id);
    data.append("course_id", course_id);
    data.append('module_type', module_type);

    try {
        const res = await axios({
            method: "post",
            url: `${config.API_URL}${config.ANSWER_SUBMIT_API_URI}`,
            data: data,
            headers: { 
                "Content-Type": "multipart/form-data", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
        });
        
        return res.data; // Return the response data if successful
    } catch (error) {
        if (error.response && error.response.status === 422) {
            // Handle the 422 error here
            console.error("Validation error: ", error.response.data);
            return error.response.data; // Return the data in case of 422
        } else {
            console.error("An error occurred: ", error.message);
            throw error; // Re-throw other errors
        }
    }
};

export default answerSubmit;
