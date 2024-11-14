import { Button, FormControl } from "@mui/material";
import styled from "@emotion/styled";
import Checkbox from '@mui/material/Checkbox';
import { forgotPassword } from "../utils/forgotPassword";
import MobileNumber from "./firdous/MobileNumber";
import { useState,useMemo, useEffect } from 'react';
import { register } from "../utils/register";
import Popup from "./firdous/Popup";
import { useNavigate } from 'react-router-dom';
import Menu from './firdous/Menu'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import welcomeAPI from "../utils/welcomeAPI";
import GenderField from "../components/fields/GenderField";
import DistrictField from "./fields/DistrictField";
import Qualification from "./fields/Qualification";
import CustomTextField from "./fields/CustomTextField"
import Link from '@mui/material/Link';
import DOBField from "./fields/DOBField";
import checkUser from "../utils/checkUser";
import { login } from "../utils/login";
import bcrypt from 'bcryptjs';
import getUserData from "../utils/getUserData";
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: "10px 10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    // flexBasis: '100%',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center',
  },
  subHead: {
    fontSize: theme.typography.pxToRem(13),
    marginLeft: '20px',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center'
  },
  detailText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  avatarPlay: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    // alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: theme.spacing(0),
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short
    })
  },
  expandIcon: {
    color: theme.palette.primary.main,
  },
  openTransition: {
    transform: "rotate(0)",
  },
  closeTransition: {
    transform: "rotate(-180deg)",
  },
  player: {
    position: 'fixed',
    bottom: theme.spacing(2),
    margin: theme.spacing(1),
    right: theme.spacing(3),
  },
}))


const NameField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;`

const MobileField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;`

const EyeField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;
  display: flex;
  flex-direction: row;
  align-items: center;`
  const Register = () => {
    const [mobileData,setMobileData]=useState({
      countryCode:"+91",
      mobile:""
    })
    const [personalData,setPersonalData]=useState({
      name:"",
      email:"",
      sex:"male",
      age:"",
      dob:"",
      district_id:"",
      panchayat_id:"",
      ward:"",
      pin:"",
      address:'',
      present_address:'',
      qualification:'',
      guide_member_id:"",
      zone_id:"",
      unit_id:"",
      defect_eye:false,
    })
    const [password,setPassword]=useState("")
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [expanded, setExpanded] = useState('');
    const classes = useStyles();
    const [showAllField,setShowAllField]=useState(0)
    const [welcomeData,setWelcomeData]=useState({});
    const [otp,setOtp]=useState({
      otp:"",otpHash:""
    });
    const [sameAddress,setSameAddress]=useState(false);
    const [popupHeading,setPopupHeading]=useState('');
    useMemo(async()=>{
      setWelcomeData(await welcomeAPI())},[])

    const navigate = useNavigate();
    const handleChange = (panel, index) => async(event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
  // Function to hash the formatted time
  async function hashCurrentTime() {
      const formattedTime = "pe@ce6@234&^%!_d!0p"
      const saltRounds = 10;
      try {
          const hash = await bcrypt.hash(formattedTime, saltRounds);
          return hash
      } catch (err) {
          console.error('Error hashing the time:', err);
      }
  }

    const handleInputChange = (value, key,isCap=false) => {
      if(isCap){
        const name = value.toUpperCase(); // Convert to uppercase
        const filteredValue =name.replace(/[^A-Z0-9\s]/g, '');

       // Allow only English letters and spaces
      setPersonalData(prevData => ({
        ...prevData,
        [key]: filteredValue // Use brackets to set dynamic key
      }));
      return
     }
     setPersonalData(prevData => ({
      ...prevData,
      [key]: value // Use brackets to set dynamic key
    }));
    };

    const forgotPasswordHandler=()=>{
        if(mobileData.mobile){
          forgotPassword(mobileData.mobile,mobileData.countryCode,setMessage,setOpen)
        }
    }

    const mobileNumberCheck=async()=>{
      if(mobileData.mobile){
        if(password){
          login(mobileData.mobile,mobileData.countryCode,password,setMessage,setOpen,navigate)
          return
        }
        if(otp.otp && !personalData.name){
          if(bcrypt.compareSync(otp.otp, otp.otpHash)){
            const hash=await hashCurrentTime()
              const result=await getUserData(mobileData,hash);
              if(result.status){
                setPersonalData({
                  name:result.data.data.name?.toUpperCase(),
                  email:result.data.data.email,
                  sex:result.data.data.gender?result.data.data.gender:"male",
                  age:result.data.data.age+2,
                  district_id:result.data.data.district_id,
                  panchayat_id:'',
                  ward:'',
                  pin:result.data.data.pinCode,
                  address:'',
                  present_address:'',
                  qualification:'',
                  guide_member_id:result.data.data.id,
                  zone_id:result.data.data.zone_id,
                  unit_id:result.data.data.unit_id,
                  defect_eye:false
                })}
                setShowAllField(2)
                return
              }
        }
        console.log(personalData)
        if(showAllField===2){
          if(personalData.name&& personalData.age&& personalData.district_id&&personalData.sex&& personalData.dob&& personalData.qualification
            &&personalData.ward&& personalData.address&& personalData.present_address &&personalData.panchayat_id
          ){
            const result =await register(personalData,mobileData,setMessage,setOpen)
          if(result?.status){
            setPopupHeading("OTP Generated Successfully") 
            setMessage("താങ്കളുടെ പാസ്‌വേഡ് വാട്ട്സ്ആപ്പിലേക്ക് / ഫോണിലേക്ക് SMS ആയി അയച്ചിട്ടുണ്ട്")
            setOpen(true)
            setShowAllField(1)
            return
          }
          }else{
            setPopupHeading("Error")
            setMessage("താങ്കൾ ഇതുവരെ നിർബന്ധമായും പൂരിപ്പിക്കേണ്ട ഭാഗങ്ങൾ പൂരിപ്പിച്ചിട്ടില്ല. അവ പൂരിപ്പിച്ച ശേഷം തുടരുക.")
            setOpen(true)
            return
          }
          
        }
        const result=await checkUser(mobileData);
        if(result.data.is_user_exist){
          setShowAllField(1)
          return
        }
        else{
          if(result.data.otp_send){
            setOtp((prev) => ({
              ...prev,
              otpHash: result.data.data.hashedOtp
          }))
            setShowAllField(3)
            return
          }
          else{
            setShowAllField(2)
            return
          }
        }
      }
    }

    useEffect(()=>{
      console.log(personalData.age)
        if(personalData.age>0)
       { const today = new Date();
        const birthYear = today.getFullYear() - personalData.age;
        handleInputChange(`${birthYear}-01-01`,"dob")
      }
    },[personalData.age])

    useEffect(() => {
      if (sameAddress) {
        handleInputChange(personalData.address, "present_address", true);
      } else if(!sameAddress){
        handleInputChange(personalData.present_address, "present_address", true);
      }
      else if (personalData.address !== personalData.present_address) {
        setSameAddress(false); // Reset when addresses are not the same
      }
    }, [personalData.address, personalData.present_address, sameAddress]);
    
  
    return (
      <>
    <form noValidate autoComplete="off">
      <MobileField>
        {/* <label style={{marginBottom:"5px",fontWeight:"bold",fontSize:"13px"}}>Country Code</label> */}
        <MobileNumber setMobileData={setMobileData}/>
      </MobileField>
    {showAllField===2&&
      <>
      <NameField>
        <CustomTextField
            label="Candidate Name"
            placeholder="പഠിതാവിൻ്റെ പേര് എഴുതുക"
            onChange={(value)=>handleInputChange(value,"name",true)}
            value={personalData.name}
/>    </NameField>
      <NameField>
        <CustomTextField type="email" size="small" label="E-mail Address" placeholder="ഇമെയിൽ ഐഡി നൽകുക" onChange={(value)=>handleInputChange(value,"email")} value={personalData.email} />
      </NameField>
      <NameField>
        <CustomTextField size="small" label="Enter Age" placeholder="വയസ്സ്" onChange={(value)=>{handleInputChange(value,"age")
        }} value={personalData.age} />
      </NameField>
      <NameField>
      <DOBField onChange={handleInputChange} value={personalData.dob} ageValue={personalData.age} />
      </NameField>
      <NameField>
        <DistrictField onChange={handleInputChange} value={personalData.district_id} />
      </NameField>
      <NameField>
        <CustomTextField type="number" size="small" label="Ward Number" placeholder="വാർഡ് നമ്പർ" onChange={(value)=>handleInputChange(value,"ward")} value={personalData.ward} />
      </NameField>
      <NameField>
      <CustomTextField
        label="Address"
        placeholder="വിലാസം"
        onChange={(value)=>handleInputChange(value,"address",true)} value={personalData.address}
      />
      </NameField>
      <EyeField>
        <label style= {{
        fontSize: '16px', // Adjust the font size for the input text and placeholder
        fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
        }}>Same as present address</label>
      <Checkbox checked={sameAddress} onChange={()=>{setSameAddress(!sameAddress)
      }} />
        </EyeField>
      <NameField>
        <CustomTextField type="number" size="small" label="Pincode" placeholder="പിൻകോഡ്" onChange={(value)=>handleInputChange(value,"pin")} value={personalData.pin} />
      </NameField>
      <NameField>
      <CustomTextField
      disabled={sameAddress}
         label="Present Address"
        placeholder="ഇപ്പോൾ താമസിക്കുന്ന സ്ഥലം"
        onChange={(value)=>handleInputChange(value,"present_address",true)} value={personalData.present_address}
      />
      </NameField>
      <NameField>
        <Qualification onChange={(value)=>handleInputChange(value,"qualification")} value={personalData.qualification} age={personalData.age}/>
      </NameField>
      <NameField style={{
          display: "flex", flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom:"5px"

        }}>
      <GenderField label={"Sex"} onChange={(value)=>handleInputChange(value,"sex")} value={personalData.sex} data={[{key:"male",value:"Male"},{key:"female",value:"Female"}]}/>
      </NameField>
      <NameField style={{
          display: "flex", flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom:"5px"

        }}>
        <GenderField label={"കാഴ്ചാ പരിമിതൻ ആണോ"} onChange={(value)=>handleInputChange(value==="yes"?true:false,"defect_eye")} value={personalData.defect_eye?"yes":"no"} data={[{key:"no",value:"NO"},{key:"yes",value:"Yes"}]}/>
        </NameField> 
      </>
  }
  { showAllField===1&&
    <>
    <NameField>
    <CustomTextField type="password" size="small" label="Enter Password" placeholder="പാസ്‌വേർഡ് ഇവിടെ നൽകുക" onChange={(e) => setPassword(e)} value={password} ></CustomTextField>
    </NameField>

    <div style={{textAlign:"center",marginTop:"10px"}}>
      <Link onClick={forgotPasswordHandler} underline="none">Forgot Password?</Link>
      </div>
    </>
  }
  { showAllField===3&&
    <NameField>
    <CustomTextField type="text" size="small" label="Enter OTP" placeholder="OTP ഇവിടെ നൽകുക" onChange={(e) => setOtp((prev) => ({
            ...prev,
            otp: e
        }))} value={otp.otp} ></CustomTextField>
    </NameField>

  }
  <div style={{
    display:"flex",
    justifyContent: "center"
  }}>
      <Button variant="contained" style={{backgroundColor:"rgb(148 233 213)",color:"black",width:"40%",margin:"1rem 10%",fontSize:"13px"}}
      onClick={mobileNumberCheck}
      >{showAllField===2? "Register":showAllField===1?"Login":showAllField===3?"Verify":"Next"}</Button>
      </div>
      <Popup heading={popupHeading} message={message} open={open} setOpen={setOpen} noClose={true}/>
    </form>
<div>
  <Typography style={{
        textAlign: 'center',  // Justify the text
        display: 'block',
        padding:'8px'      // Ensure block-level element
      }}>  {welcomeData?.data?.tittle}</Typography>
    <Typography
      variant="caption"
      style={{
        textAlign: 'left',  // Justify the text
        display: 'block',
        padding:'10px'      // Ensure block-level element
      }}
    >{welcomeData?.data?.desc}
  </Typography>
</div>
{
  welcomeData?.data?.courseType.map((item,index)=> <Menu key={index} classes={classes} label="Course Details" fn={handleChange} abc={expanded} idd={`a${index+1}`} course_name={item.name} course_data={item.desc} />
  )
}
    </>
    );
}

export default Register;