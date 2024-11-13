import {useState,useContext} from 'react';
import { Typography, Avatar, Button, TextField } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import lateExamRequest from "../../../utils/lateExamRequest"
import { UserContext } from '../../../contexts/UserContext';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import styled from "@emotion/styled";
import { CourseContext } from '../../../contexts/CourseContext';
import homeTabFetch from '../../../utils/hometab';
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: "10px 10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    // flexBasis: '100%',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center',
  },
  detailText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
    whiteSpace: 'pre-line',
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  avatarPlay: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    // alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: theme.spacing(0),
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short
    })
  },
  expandIcon: {
    color: theme.palette.primary.main,
  },
  openTransition: {
    transform: "rotate(0)",
  },
  closeTransition: {
    transform: "rotate(-180deg)",
  },
  player: {
    position: 'fixed',
    bottom: theme.spacing(2),
    margin: theme.spacing(1),
    right: theme.spacing(3),
  },
  button: {
    marginLeft: '70px',
    //marginTop: '15px'
  },
  textField: {
    width: '130px',
    //display: 'inline-block'
  }
}));

const ItemBox=styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 5px;
    margin-top: 10px;
    margin-bottom:10px;
    margin-left:20px;`
    

const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    // boxShadow: 'none',
    // '&:not(:last-child)': {
    //     borderBottom: 0,
    // },
    // '&:before': {
    //     display: 'none',
    // },
    // '&$expanded': {
    //     margin: 'auto',
    // },
  },
  expanded: {
    '&$expanded': {
      margin: '12px 0',
      borderRadius: '5px',
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'lightgrey',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    fontWeight: 700,
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails);

const LateExamRequest = (props) => {
  const [value, setValue] = useState('');
  const [startDate,setStartDate] =useState('')
  const [endDate,setEndDate]=useState('')
  const { user } = useContext(UserContext);
  const [qEexpanded, setQExpanded] = useState(false);
  const {course,setCourse} = useContext(CourseContext)
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const qHandleChange = (panel) => (event, newExpanded) => {
    setQExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();

  const onSubmit=async()=>{
    console.log(props.course.id)
    if(value && startDate && endDate){
      const result=await lateExamRequest(value,course.id,user.selectedUser.id,startDate,endDate)
      if(result.status){
        const res = await homeTabFetch(course.id, user.selectedUser.id);
        setCourse(res.data);
        setStartDate('')
        setEndDate('')
        setValue('')
      }
    }
  }


  return (
    <Accordion expanded={props.expanded === props.id} onChange={props.handleChange(props.id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        aria-controls=""
        id=""
      >
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography className={classes.heading}>Late Exam Request</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ padding: '25px' }}>
          <Typography style={{ marginBottom: '15px' }}>ഹജ്ജ്, ഉംറ മെഡിക്കൽ പ്രേശ്നങ്ങൾ തുടങ്ങിയവ കാരണം ക്ലാസ് ടെസ്റ്റുകൾ നഷ്ടപെടുന്നവർ ഈ സംവിധാനം ഉപയോഗപ്പെടുത്താം വൈകി അയച്ചത് കാരണമുള്ള മാർക്കിലുള്ള കുറവ് ഇത്തരം ആളുകൾക്കു ബാധകം അല്ല </Typography>
          <form>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ marginBottom: '15px' }}>Select the reason for request:</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="Hajj/Umrah" control={<Radio />} label="Hajj/Umrah" />
                <FormControlLabel value="Medical Issues" control={<Radio />} label="Medical Issues" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" style={{ marginBottom: '15px' }} />
                {value === 'Other' && <TextField id="standard-basic" variant="outlined" size='small' placeholder="Text your reason" style={{ marginBottom: '15px' }} />}
              </RadioGroup>
              <Typography style={{ marginBottom: '15px' }}>Select date:</Typography>
              <TextField
                id="date"
                label="From"
                type="date"
                onChange={(e)=>setStartDate(e.target.value)}
                //defaultValue="18-12-2023"
                style={{ marginBottom: '15px' }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
              />
              <TextField
                id="date"
                label="To"
                type="date"
                //defaultValue="2017-05-24"
                style={{ marginBottom: '15px' }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setEndDate(e.target.value)}
                value={endDate}
              />
              <Button variant="outlined" color="primary" className={classes.button} onClick={onSubmit}  style={{
                textTransform: 'none' 
            }}>
                Submit
              </Button>
            </FormControl>

          </form>
        </div>
        <div style={{ padding: '10px' }}>
          {
            props.course.late_exam?.map((x, i) =>
              <Accordion key={i} expanded={qEexpanded === `s${i}`} onChange={qHandleChange(`s${i}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                  aria-controls=""
                  id=""
                  style={{ backgroundColor: 'lightgray' }}
                >
                  <Avatar className={classes.avatar}>
                    <QuestionAnswerIcon />
                  </Avatar>
                  <Typography className={classes.heading}>{x.comments}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ItemBox>
                    <Typography>Start Date</Typography>
                    <div style={{marginRight:"10px"}}>:</div>
                    <Typography>{x.start_date}</Typography>
                  </ItemBox>
                  <ItemBox>
                    <Typography>End Date</Typography>
                    <div style={{marginRight:"10px"}}>:</div>
                    <Typography>{x.end_date}</Typography>
                  </ItemBox>
                  <ItemBox>
                    <Typography>Status</Typography>
                    <div style={{marginRight:"10px"}}>:</div>

                    <Typography style={{
                      color:
                      x.status===0? "Red":"Green"
                    }}>{x.status_text}</Typography>
                  </ItemBox>
                </AccordionDetails>
              </Accordion>
            )
          }

        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default LateExamRequest
