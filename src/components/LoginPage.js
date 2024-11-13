import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,useEffect } from 'react';
import Register from './Register';
import GlobalFAQ from './GlobalFAQ';
import getGeneralFAQ from '../utils/generalFAQ';
const MainCard = styled(Card)`
    margin: 5rem 5%;`

const MainTab = styled(Tab)`
    &.Mui-selected {
        color: #00A881;
        font-weight: 700;
        font-size: 1rem;
    }
`;


const LoginPage=()=>{
    const [tabValue, setTabValue] = useState(0);
    const [generalFAQ, setGeneralFAQ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGeneralFAQ();
        setGeneralFAQ(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

    return(
        <>
        <MainCard>
            <Tabs
                value={tabValue}
                indicatorColor="white"
                textColor="secondary"
                variant="fullWidth"
                sx={{
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
                    borderBottom: '1px solid #e0e0e0',
                    // Optional: Border to separate tabs
                  }}
                onChange={(e, newValue) => {
                    setTabValue(newValue);
                }}
            >
                <MainTab label="Register/Login" sx={{textTransform:"none",borderLeft:'1px solid #' }}/>
                <MainTab label="FAQ" />
            </Tabs>
            {tabValue===0 ? <Register /> : <GlobalFAQ faqData={generalFAQ.data}/>}
        </MainCard>
        </>
    )
}
export default LoginPage;