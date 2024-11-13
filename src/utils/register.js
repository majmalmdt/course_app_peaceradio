import axios from 'axios';
import config from './config.json';

export const register = async (personalData,mobileData,setMessage,setOpen) => {
    try{
    let data = new FormData();
    data.append('name', personalData.name);
    data.append('mobile', mobileData.mobile);
    data.append('country_code', mobileData.countryCode);
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

   

 const response= await  axios.request({
        method: 'post',
        url: `${config.API_URL}${config.REGISTER_API_URI}`,
        data : data
        })
        if (response.status) {
            localStorage.setItem('token', data.token);
            return response.data;
        } else {
            setMessage(data);
            setOpen(true);
        }
    }
    catch(err){
        console.log(err)
        return err.response.data
      }
}