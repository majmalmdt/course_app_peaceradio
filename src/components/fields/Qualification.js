import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
const Qualification=(props)=>{
    const [qualification,setQualification]=useState(props.value? props.value : 0)
    const [qualificationList,setQualificationList]=useState([])
    useEffect(()=>{
        if(props.age>15){
            setQualificationList([
                "SSLC ക്ക് താഴെ",
                "SSLC",
                "+2",
                "ITI",
                "Degree",
                "Diploma",
                "PG and Higher",
                "Other"
            ])
        }
        else{
            setQualificationList([
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ])
        }
    },[props.age])
    const handleChange = (event) => {
        setQualification(event.target.value);
        props.onChange(event.target.value)
      };
    return (
        <div>
          <FormControl sx={{ width:"100%" }}>
            <InputLabel style={{fontWeight:"bolder"}} id="demo-simple-select-helper-label">Qualification</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={qualification}
              label="Qualification"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label',  sx: {
                padding: 0, 
              }, }}
              sx={{
                fontSize: '14px',
                padding: '8.5px 14px',
                color: qualification===0&&'rgba(0, 0, 0, 0.3)',
                fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
 
              }}
            >
              <MenuItem  disabled value={0}>
            <span sx={{
                color: 'rgba(0, 0, 0, 0.3)',
 
              }}>വിദ്യാഭ്യാസ യോഗ്യത</span>
          </MenuItem>
                {qualificationList.map((item,index)=> <MenuItem key={index} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      );
}
export default Qualification