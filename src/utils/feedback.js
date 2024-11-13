import axios from "axios";
import config from "./config.json";

const addFeedback = async(comment,courseMasterId, userId, onSuccessCallback) => {
  try{
    let data = new FormData();
    data.append("comment", comment)
    data.append("course_master_id",courseMasterId)
    data.append("course_candidate_id",userId)
    const res = await axios({
      method:"post",
      url:`${config.API_URL}${config.SUBMIT_FEEDBACK}`,
      data:data,
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    onSuccessCallback()
    return res.data
  }catch(err){
    if(err.response.status===401){
      localStorage.removeItem('token')
  }    return err.response.data
  }
}

export default addFeedback