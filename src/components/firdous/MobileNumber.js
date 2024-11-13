import ReactFlagsSelect from "react-flags-select";
import countryCodes from "country-codes-list";
import { useEffect, useState } from 'react';
import styled from "@emotion/styled";

import CustomTextField from "../fields/CustomTextField";

const ReactFlagsSelectComp = styled(ReactFlagsSelect)`
  color: black;
  padding: 0;
  margin-bottom: 20px;
`;

const countryCustomLabels = countryCodes.customList('countryCode', '+{countryCallingCode} {countryNameEn}');

const MobileNumber = ({ setMobileData }) => {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    setMobileData({
      countryCode: countryCustomLabels[selectedCountry].split(" ")[0],
      mobile: mobile
    });
  }, [selectedCountry, mobile]);  // Optimized dependencies

  return (
    <>
      <ReactFlagsSelectComp
        selected={selectedCountry}
        customLabels={countryCustomLabels}
        defaultCountry="IN"
        searchable={true}
        onSelect={(code) => setSelectedCountry(code)}
        alignOptionsToRight
        fullWidth={true}
      />
      <CustomTextField
        type="number"
        label="Mobile Number"
        placeholder="മൊബൈൽ നമ്പർ നൽകുക"
        onChange={(e) => setMobile(e)}  // Properly handle input change
      /> 
    </>
  );
};

export default MobileNumber;
