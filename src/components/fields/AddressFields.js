import React, { useState } from 'react';
import CustomTextField from './CustomTextField';
const AddressField = ({isSameAddress,address}) => {
  const [presentAddress, setPresentAddress] = useState(address? address:'');


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
