import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function GenderField({label, value, onChange, data = [] }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="gender-select-label" sx={{ fontFamily: '"Noto Sans Malayalam", sans-serif', fontSize: '14px' }}>
        {label}
      </InputLabel>
      <Select
        labelId="gender-select-label"
        id="gender-select"
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          fontSize: '14px',
          padding: '8.5px 14px',
          fontFamily: '"Noto Sans Malayalam", sans-serif',
        }}
        inputProps={{
          sx: {
            padding: 0, // Remove padding from the input text
          },
        }}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
