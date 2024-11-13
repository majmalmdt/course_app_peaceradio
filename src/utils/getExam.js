import axios from "axios";
import config from "./config.json";

const getExam = async(module_id, userId) => {
  try{
    let data = new FormData();
    data.append("module_id",module_id)
    data.append("course_candidate_id",userId)
    const res = await axios({
      method:"post",
      url:`${config.API_URL}${config.GET_EXAM}`,
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
  }
    return err.response.data
  }
}

export default getExam