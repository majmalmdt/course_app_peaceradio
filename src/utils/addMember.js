import axios from 'axios';
import config from './config.json';
const addMember = async (personalData,userId) => {
    try{
    let data = new FormData();
    data.append('name', personalData.name);
    data.append('email', personalData.email);
    data.append('sex', personalData.sex);
    data.append('age', personalData.age);
    data.append('district_id', personalData.district_id);
    data.append('panchayat_id', personalData.panchayat_id);
    data.append('ward', personalData.ward);
    data.append('pin', personalData.pin);
    data.append('address', personalData.address);
    data.append('present_address', personalData.present_address);
    data.append('qualification', personalData.qualification);
    data.append('guide_member_id', personalData.guide_member_id);
    data.append('zone_id', personalData.zone_id);
    data.append('unit_id', personalData.unit_id);
    data.append('defect_eye',personalData.defect_eye?1:0)
    const res = await axios({
        method: "post",
        url: userId ? `${config.API_URL}${config.ADD_MEMBER_API_URI}/${userId}` : `${config.API_URL}${config.ADD_MEMBER_API_URI}`,
        data: data,
        headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
         },
    })
    return res.data;
    }
    catch(error){
        if(error.response.status===401){
            localStorage.removeItem('token')
        }
        return error.response.data;
    }
}

export default addMember;