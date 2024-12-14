import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getDistrict from "../../utils/getDistrict";
import getPanchayat from "../../utils/getPanchayat";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export default function DistrictField({ value, onChange, panchayat_id }) {
  const [district, setDistrict] = useState({ id: value || 0, district_id: 0 });
  const [panchayat, setPanchayat] = useState(panchayat_id || 0);
  const [districtList, setDistrictList] = useState([]);
  const [panchayatList, setPanchayatList] = useState([]);

  useEffect(() => {
    setDistrict({ id: value || 0, district_id: 0 });
    setPanchayat(panchayat_id || 0);
  }, [value, panchayat_id]);
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districts = await getDistrict();
        setDistrictList(districts.data);
        if (district.id) {
          setDistrict((prev) => ({
            ...prev,
            district_id: districts.data.find((d) => d.id === district.id)?.district_id || 0,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, [district.id]);

  useEffect(() => {
    if (district.district_id) {
      const fetchPanchayat = async () => {
        try {
          const panchayats = await getPanchayat(district.district_id);
          setPanchayatList(panchayats.data);
        } catch (error) {
          console.error("Failed to fetch panchayats:", error);
        }
      };

      fetchPanchayat();
    }
  }, [district.district_id]);

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districtList.find((item) => item.id === selectedDistrictId);

    setDistrict((prev) => ({
      ...prev,
      id: selectedDistrictId,
      district_id: selectedDistrict?.district_id || 0,
    }));

    onChange(selectedDistrictId, "district_id");
  };

    const handlePanchayatChange = (newPanchayat) => {
      setPanchayat(newPanchayat);
      onChange(newPanchayat?.id || 0, "panchayat_id");
    };

  return (
    <div>
      <FormControl sx={{ my:"10px",width:"100%" }}>
        <InputLabel style={{fontWeight:"bolder"}} id="demo-simple-select-helper-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={district.id}
          label="District"
          placeholder='ജില്ല'
          onChange={handleDistrictChange}
          inputProps={{ sx: {
            padding: 0, // Remove padding from the input text
          }, }}
          sx={{
            fontSize: '14px',
            padding: '8.5px 14px',
            color: district===0 &&'rgba(0, 0, 0, 0.3)',
            fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
            // Set font size for the selected item
          }}
        >
          <MenuItem disabled value={0}>
            <span >ജില്ല</span>
          </MenuItem>
            {districtList.map((item,index)=> <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ my:"10px",width:"100%" }}>
      {/* <InputLabel style={{fontWeight:"bolder"}} id="demo-simple-select-helper-label">Panchayat</InputLabel> */}
      <Autocomplete
  disablePortal
  value={panchayat}
  onChange={(event, newValue) => handlePanchayatChange(newValue)}
  options={panchayatList}
  getOptionLabel={(option) => option?.name || ""}
  renderInput={(params) => (
    <TextField
      size="small"
      {...params}
      placeholder="പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി"
      inputProps={{
        ...params.inputProps,
        sx: {
          padding: 0,
        },
      }}
      sx={{
        fontSize: "14px",
        fontFamily: '"Noto Sans Malayalam", sans-serif',
      }}
    />
  )}
  isOptionEqualToValue={(option, value) => option?.id === value?.id}
/>
      </FormControl>
    </div>
  );
}