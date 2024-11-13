import React, { useState } from 'react';
import CustomTextField from './CustomTextField';
const AddressField = () => {
  const [presentAddress, setPresentAddress] = useState('');
  const [isSameAddress, setIsSameAddress] = useState(false);


  const handlePresentAddressChange = (event) => {
    setPresentAddress(event.target.value);
  };


  return (
    <>
      
      <CustomTextField
        label="Present Address"
        placeholder="ഇപ്പോൾ താമസിക്കുന്ന സ്ഥലം"
        value={presentAddress}
        onChange={handlePresentAddressChange}
        disabled={isSameAddress}
      />
      </>
  );
};

export default AddressField;
