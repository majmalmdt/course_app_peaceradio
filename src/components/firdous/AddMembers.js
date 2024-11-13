import styled from "@emotion/styled";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, FormControl,OutlinedInput } from "@mui/material";
import CustomTextField from "../fields/CustomTextField"
import { useState,useContext,useEffect } from "react";
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from "@mui/joy/styles";
import Qualification from "../fields/Qualification"
import DOBField from "../fields/DOBField"
import GenderField from "../fields/GenderField";
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { UserContext } from "../../contexts/UserContext";
import addMember from "../../utils/addMember";
import homePage from "../../utils/homePage"
import Popup from "./Popup";

const joyTheme = joyExtendTheme()



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid',
  boxShadow: 24,
  borderRadius:"6px",
  p: 4,
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const NameField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;`

const MobileField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;`

const EyeField = styled(FormControl)`
  width: 80%;
  margin: 0 10%;
  display: flex;
  flex-direction: row;
  align-items: center;`
export default function AddMembers() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
    defect_eye:false
  })

  const handleInputChange = (value, key,isCap=false) => {
    if(isCap){
      const name = value.toUpperCase(); // Convert to uppercase
      const filteredValue = name.replace(/[^A-Z\s]/g, '');

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

  const onClick=async()=>{
    const res=await addMember(personalData)
    if(res.status){
      const newUsersRes = await homePage()
      const selectedUser = user?.selectedUser?.id ? newUsersRes.data.members.find((member) => member.id === Number(user?.selectedUser?.id)) : newUsersRes.data.members[0]
      setUser({memberList:newUsersRes.data.members,selectedUser})
      navigate("/")
    }
    else{
      setMessage("താങ്കളുടെ പേരിൽ നേരത്തെ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്. താങ്കളുടെ വിവരങ്ങൾ പുതുക്കാൻ edit profile ഓപ്ഷൻ ഉപയോഗിക്കുക.")
      setOpen(true)
    }
  }
  useEffect(()=>{
      if(personalData.age>0)
     { const today = new Date();
      const birthYear = today.getFullYear() - personalData.age;
      handleInputChange(`${birthYear}-01-01`,"dob")}
      console.log(personalData.dob)
  },[personalData.age, personalData.dob])

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <div style={{
          marginTop:"5rem",
          display:"flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom:"1rem"
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Add Member
        </Typography>
      </div>
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
        <CustomTextField size="small" label="Enter Age" placeholder="വയസ്സ്" onChange={(value)=>handleInputChange(value,"age")} value={personalData.age} />
      </NameField>
      <NameField>
      <DOBField onChange={handleInputChange} value={personalData.dob}/>
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
      <Button variant="contained" style={{backgroundColor:"rgb(148 233 213)",color:"black",width:"40%",margin:"1rem 10%",fontSize:"13px"}} onClick={onClick}
      >Add Member</Button>
      </Container>
      <Popup message={message} open={open} setOpen={setOpen} onSuccessHandler={()=>{
        navigate("/")
      }} noClose={true}/>
    </ThemeProvider>
  );
}