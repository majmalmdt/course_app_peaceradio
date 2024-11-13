import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const DOBField = ({ onChange, value }) => {
  const [dob, setDOB] = useState(value || '2000-01-01');
  const [age, setAge] = useState(0);

  // Sync initial value to state if passed from props


  // Calculate age based on dob change
  useEffect(() => {
    if (dob && dob !== '2000-01-01') {
      const birthDate = dayjs(dob);
      const today = dayjs();
      const calculatedAge = today.diff(birthDate, 'year');

      // Only update age and call onChange if the calculated age is different
      if (calculatedAge !== age) {
        setAge(calculatedAge);
        onChange(calculatedAge, 'age'); // Call onChange only when the age changes
      }

      // Always call onChange for dob, but avoid setting it again unnecessarily
      onChange(dob, 'dob');
    }
  }, [dob]); // Trigger only when dob changes

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          label="Date Of Birth"
          value={dayjs(dob)} // Control the value prop
          format="DD-MM-YYYY"
          onChange={(newValue) =>{ 
            setDOB(newValue ? newValue.format('YYYY-MM-DD') : '')}}
          inputProps={{
            sx: {
              padding: '8.5px 14px',
            },
          }}
          sx={{
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.3)',
            fontFamily: '"Noto Sans Malayalam", sans-serif',
          }}
          InputLabelProps={{
            shrink: true, 
            sx: {
              fontSize: '16px',
              fontFamily: '"Noto Sans Malayalam", sans-serif',
              fontWeight: 'bold',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DOBField;
