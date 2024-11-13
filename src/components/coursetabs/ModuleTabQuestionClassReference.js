import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import QuestionDisplay from './QuestionDisplay';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      onClick={(e) => e.stopPropagation()}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  detailText: {
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  detailQuestionText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  tabsAppBar: {
    boxShadow: 'none',
  },
  tabNames: {
    textTransform: 'none',
  }
}));

export default  function ScrollableTabsButtonAuto({ module,moduleId,reference,isLoading, moduleDetails,course }) {
  const removeHtml = /(<([^>]+)>)/ig
  const removeSlashNR = /(\r\n|\r|\n)+/g

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [fontSiz, setFontSiz] = useState(14)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabsAppBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {moduleDetails&&<Tab className={classes.tabNames} label={moduleDetails.module_type==="Class"?"Class Test":moduleDetails.module_type} {...a11yProps(0)} />}
          {reference&&<Tab className={classes.tabNames} label="Reference" {...a11yProps(1)} />}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <QuestionDisplay qsObj={module?.length > 0 ? module  : []} moduleId={moduleId} isLoading={isLoading} moduleDetails={moduleDetails} course={course}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ float: 'right' }}>
          <Button onClick={() => setFontSiz(fontSiz + 1)}>+</Button>
          <Button onClick={() => setFontSiz(fontSiz - 1)}>-</Button>
        </ButtonGroup>
        <Typography className={classes.detailText} style={{ fontSize: `${fontSiz}px` }}>{reference?.reference_text? reference?.reference_text?.replace(removeHtml, '').replace(removeSlashNR, '$1'):"ഈ ക്ലാസിൻ്റെ റഫറൻസ് ഇപ്പോൾ ലഭ്യമല്ല"}</Typography>
      </TabPanel>

    </div>
  );
}
