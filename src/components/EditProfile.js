import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, FormControl, IconButton, Avatar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomTextField from "./fields/CustomTextField";
import Qualification from "./fields/Qualification";
import DOBField from "./fields/DOBField";
import GenderField from "./fields/GenderField";
import DistrictField from "./fields/DistrictField";
import { UserContext } from "../contexts/UserContext";
import addMember from "../utils/addMember";
import homePage from "../utils/homePage";
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid',
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
};

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

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    sex: "male",
    age: "",
    dob: "",
    district_id: "",
    panchayat_id: "",
    ward: "",
    pin: "",
    address: '',
    present_address: '',
    qualification: '',
    guide_member_id: "",
    zone_id: "",
    unit_id: "",
    defect_eye: false,
    avatar: null // New state for storing the avatar image URL
  });
  const [sameAddress,setSameAddress]=useState(false);


  useEffect(() => {
    setPersonalData({ ...personalData, ...user?.selectedUser });
  }, [user]);

  const handleInputChange = (value, key, isCap = false) => {
    if (isCap) {
      const name = value.toUpperCase();
      const filteredValue = name.replace(/[^A-Z0-9\s]/g, '');
      setPersonalData(prevData => ({
        ...prevData,
        [key]: filteredValue
      }));
      return;
    }
    setPersonalData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPersonalData(prevData => ({
  //         ...prevData,
  //         avatar: reader.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onClick = async () => {
    const res = await addMember(personalData, user?.selectedUser?.id);
    if (res.status) {
      const newUsersRes = await homePage();
      const selectedUser = user?.selectedUser?.id ? newUsersRes.data.members.find((member) => member.id === Number(user?.selectedUser?.id)) : newUsersRes.data.members[0];
      setUser({ memberList: newUsersRes.data.members, selectedUser:selectedUser });
      navigate("/");
    } else {
      // Handle error
    }
  }
  const deleteMember =async ()=>{
    const res = await deleteMember(user?.selectedUser?.id);
    if (res.status) {
      const newUsersRes = await homePage();
      const selectedUser = user?.selectedUser?.id ? newUsersRes.data.members.find((member) => member.id === Number(user?.selectedUser?.id)) : newUsersRes.data.members[0];

      setUser({ memberList: newUsersRes.data.members, selectedUser:selectedUser });
      navigate("/");
    } else {
      // Handle error
    }
  }
  useEffect(()=>{
      if(personalData.age>0)
     { const today = new Date();
      const birthYear = today.getFullYear() - personalData.age;
      handleInputChange(`${birthYear}-01-01`,"dob")}
  },[personalData.age, personalData.dob])
  useEffect(() => {
    if (sameAddress) {
      handleInputChange(personalData.address, "present_address", true);
    } else if(!sameAddress){
      handleInputChange("", "present_address", true);
    }
    else if (personalData.address !== personalData.present_address) {
      setSameAddress(false); // Reset when addresses are not the same
    }
  }, [personalData.address, personalData.present_address, sameAddress]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div style={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem"
        }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}
              src={personalData.avatar}
            >
              {!personalData.avatar && <AccountCircleIcon />}
            </Avatar>
            {/* <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            /> */}
          </IconButton>
          <Typography component="h1" variant="h5">
            Edit Member
          </Typography>
        </div>
        <NameField>
          <CustomTextField
            label="Candidate Name"
            placeholder="പഠിതാവിൻ്റെ പേര് എഴുതുക"
            onChange={(value) => handleInputChange(value, "name", true)}
            value={personalData.name}
          />
        </NameField>
        <NameField>
          <CustomTextField type="email" size="small" label="E-mail Address" placeholder="ഇമെയിൽ ഐഡി നൽകുക" onChange={(value) => handleInputChange(value, "email")} value={personalData.email} />
        </NameField>
        <NameField>
          <CustomTextField size="small" label="Enter Age" placeholder="വയസ്സ്" onChange={(value) => handleInputChange(value, "age")} value={personalData.age} />
        </NameField>
        <NameField>
          <DOBField onChange={handleInputChange} value={personalData.email} />
        </NameField>
        <NameField>
          <DistrictField onChange={handleInputChange} value={personalData.district_id} />
        </NameField>
        <NameField>
          <CustomTextField type="number" size="small" label="Ward Number" placeholder="വാർഡ് നമ്പർ" onChange={(value) => handleInputChange(value, "ward")} value={personalData.ward} />
        </NameField>
        <NameField>
          <CustomTextField
            label="Address"
            placeholder="വിലാസം"
            onChange={(value) => handleInputChange(value, "address", true)} value={personalData.address}
          />
        </NameField>
        <EyeField>
        <label style= {{
        fontSize: '16px', // Adjust the font size for the input text and placeholder
        fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
        }}>Same as present address</label>
      <Checkbox checked={sameAddress} onChange={()=>setSameAddress(!sameAddress)} />
        </EyeField>
        <NameField>
          <CustomTextField type="number" size="small" label="Pincode" placeholder="പിൻകോഡ്" onChange={(value) => handleInputChange(value, "pin")} value={personalData.pin} />
        </NameField>
        <NameField>
          <CustomTextField
            label="Present Address"
            placeholder="ഇപ്പോൾ താമസിക്കുന്ന സ്ഥലം"
            onChange={(value) => handleInputChange(value, "present_address", true)} value={personalData.present_address}
          />
        </NameField>
        <NameField>
          <Qualification onChange={(value) => handleInputChange(value, "qualification")} value={personalData.qualification} age={personalData.age} />
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
        <div style={{display:"flex",justifyContent: "space-between"}}>
        <Button variant="contained" style={{ backgroundColor: "rgb(148 233 213)", color: "black", margin: "1rem 10%", fontSize: "13px",     textTransform: "none", }} onClick={onClick}
        >Edit Profile</Button>
        {user.selectedUser.parent_flag!=="Y" &&<Button variant="contained" style={{ backgroundColor: "rgb(255 0 0)", color: "black", margin: "1rem 10%", fontSize: "13px",     textTransform: "none", }} onClick={deleteMember}
        >Delete Member</Button>}
        </div>
      </Container>
    </ThemeProvider>
  );
}
