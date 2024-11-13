import axios from "axios";
import config from "./config.json";

const lateExamRequest = async(comment,courseMasterId, userId,startDate,endDate) => {
  try{
    let data = new FormData();
    data.append("comments", comment)
    data.append("course_master_id",courseMasterId)
    data.append("course_candidate_id",userId)
    data.append("start_date",startDate)
    data.append("end_date",endDate)
    const res = await axios({
      method:"post",
      url:`${config.API_URL}${config.SUBMIT_LATE_EXAM}`,
      data:data,
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.data
  }catch(err){
 if(err.response.status===401){
  localStorage.removeItem('token')
}    return err.response.data
  }
}

export default lateExamRequest