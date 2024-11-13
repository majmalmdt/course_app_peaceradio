import axios from "axios";
import config from "./config.json";

const getCertificate = async(course_type,type,course_candidate_id, course_master_id) => {
  try{
    let data = new FormData();
    data.append("course_type",course_type)
    data.append("type",type)
    data.append("course_candidate_id",course_candidate_id)
    data.append("course_master_id",course_master_id)
    const res = await axios({
      method:"post",
      url:`${config.API_URL}${config.CERTIFICATE}`,
      data: data,
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    return res?.data
  }catch(err){
    if(err.response?.status===401){
      localStorage.removeItem('token')
  }
    return err.response.data
  }
}

export default getCertificate