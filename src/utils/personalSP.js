import axios from "axios";
import config from "./config.json";

const personalSP = async(courseMasterId, userId,time,type) => {
  try{
    let data = new FormData();
    data.append("course_master_id",courseMasterId)
    data.append("course_candidate_id",userId)
    data.append("time",time)
    data.append("type",type)
    const res = await axios({
      method:"post",
      url:`${config.API_URL}${config.SUBMIT_PSP}`,
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

export default personalSP;