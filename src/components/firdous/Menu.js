import React, { useEffect, useState } from 'react'
import { Typography, Avatar, Button, TextField } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SchoolIcon from '@material-ui/icons/School';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import messages from "../../message/menu"
import addFeedback from '../../utils/feedback';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClassReferenceQuestionTab from "../coursetabs/ModuleTabQuestionClassReference"
import Textarea from '@mui/joy/Textarea';
import UploadFields from "../fields/UploadFields"
import '@react-pdf-viewer/core/lib/styles/index.css';
import Popup from "../firdous/Popup";
import courseUnEnroll from "../../utils/courseUnEnroll"
import courseReset from "../../utils/courseReset"
import { useNavigate } from 'react-router-dom';
import CertificateCapture from "./Certificate";
import QuizIcon from '@mui/icons-material/Quiz';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReplayIcon from '@mui/icons-material/Replay';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextsmsIcon from '@mui/icons-material/Textsms';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import { CourseContext } from '../../contexts/CourseContext';
// import logo from '../../files/Peaceradio-logo.png';
// import Mqs from '../coursetabs/QuestionDisplay'

const NameField = styled(FormControl)`
  width: 80%;
  margin: 1rem 10% 0 10%;`


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
}));


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
    // backgroundColor: 'rgba(0, 0, 0, .03)',
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

const Menu = (props) => {
  var a = 'lightblue'
  const [feedbackText, setFeedbackText] = useState("");
  const [errors, setErrors] = useState({})
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [feedbackSubmittedText, setFeedbackSubmittedText] = useState(props.data?.feedback);
  const [doubtClearanceText, setDoubtClearanceText] = useState("");
  const [qEexpanded, setQExpanded] = useState(false);
  const [weighageExpanded, setWeighageExpanded] = useState(false);
  const classes = useStyles();
  const qHandleChange = (panel) => (event, newExpanded) => {
    setQExpanded(newExpanded ? panel : false);
  };
  const { user } = useContext(UserContext);
  const { course } = useContext(CourseContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (feedbackSubmittedText) {
      setFeedbackText(feedbackSubmittedText)
    }
  }, [feedbackSubmittedText])


  const downloadButtonHandler = async (pdfUrl, pdfUrlName) => {
    const fileText = await fetch(pdfUrl, {
      mode: 'no-cors'
    }).then((res) => res.text())

    const blob = new Blob([fileText], {
      type: "application/pdf"
    })

    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = pdfUrlName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl)
  }

  const handleFileDownload = async (fileUrl, fileName ="sample.pdf") => {
    try {
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
  
      const blob = await response.blob();  // Convert the response to a Blob
      const url = window.URL.createObjectURL(blob);  // Create a local URL
  
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'downloaded-file';
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);  // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  

  

  const handleFeedbackOnSuccess = () => {
    setIsFeedbackSubmitted(true)
  }



  const handleSubmitFeedback = async () => {
    if (feedbackText === "") {
      setErrors({ feedback: "error" })
    } else {
      setErrors({ feedback: "" })
      await addFeedback(feedbackText, props.data.id, user && user?.selectedUser.id, handleFeedbackOnSuccess)
      setFeedbackSubmittedText(feedbackText)
    }
    return <Accordion disabled={props.data.feedback} onChange={props.fn("a5")} expanded={props.abc === "a5"} elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
        aria-controls=""
        id=""
        style={{ backgroundColor: `${a}` }}
      >
        <Avatar className={props.classes.avatar}>
          <SchoolIcon />
        </Avatar>
        <Typography className={props.classes.heading}>{messages.certificateLabel}</Typography>

      </AccordionSummary>
      <AccordionDetails>
      </AccordionDetails>
    </Accordion>
  }

  if (props.label === 'Course Work') {
    return (
      <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
          aria-controls=""
          id=""
        >
          <Avatar className={props.classes.avatar}>
            <AutoStoriesIcon />
          </Avatar>
          <Typography className={props.classes.heading}>{props.label}</Typography>

        </AccordionSummary>
        <AccordionDetails>
          {
            props.data.course_work && props.data.course_work.map((courseWork, indx) => (
              <div key={indx} style={{ padding: "25px" }}>
                <Typography variant='h6' style={{ padding: '0 25px', backgroundColor: 'lightgrey', color: 'black' }}> {indx + 1}) {courseWork.title}</Typography>
                <div dangerouslySetInnerHTML={{ __html: courseWork.html }} style={{ padding: "10px" }} />
                {
                  courseWork.file_url && (
                    <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', margin: '20px auto' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ textTransform: 'none' }}
          onClick={() => handleFileDownload(courseWork.file_url)}
        >
          Downloads
        </Button>
      {/* </a> */}

      {/* Download PDF button */}
    </div>
                    </>
                  )
                }
              </div>
            ))
          }
          {/* Since the requirement is not yet confirmed, commenting out bottom section */}
          {/* <div style={{ padding: '25px' }}>
            {props.data.d1}
          </div> */}
        </AccordionDetails>
      </Accordion>)
  }
  if (props.label === 'Assignment') {
    return (
      <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
          aria-controls=""
          id=""
        >
          <Avatar className={props.classes.avatar}>
            <SchoolIcon />
          </Avatar>
          <Typography className={props.classes.heading}>{props.label}</Typography>

        </AccordionSummary>
        <AccordionDetails>
          {
            props.data.assignment && props.data?.assignment.map((assWrk, indx) => (
              <>
                <Typography variant='h6' style={{ padding: '0 25px', backgroundColor: 'lightgrey', color: 'black' }}> {indx + 1}) {assWrk.title}</Typography>
                <div dangerouslySetInnerHTML={{ __html: assWrk.html }} style={{ padding: "10px" }} />
                {
                  assWrk.file_url && (
                    <Button
                      variant='contained' style={{ width: '25%', margin: '10px auto', textTransform: 'none', textAlign: "center" }} color='primary'
                      onClick={() => downloadButtonHandler(assWrk.file_url, assWrk.file)}
                    >
                      Download
                    </Button>
                  )
                }
                <UploadFields></UploadFields>

              </>
            ))
          }
          {/* <div style={{ padding: '25px' }}>Content here</div>
          <Button variant='contained' style={{ width: '25%', margin: '10px auto', textTransform: 'none' }} color='secondary'>Upload</Button> */}

        </AccordionDetails>
      </Accordion>
    )
  }
  if (props.label === 'Certificate') {
    return <Accordion disabled={!props.data.result || props.data.result.total_mark < 50 || !props.data.feedback} onChange={props.fn("a5")} expanded={props.abc === "a5"} elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
        aria-controls=""
        id=""
        style={{ backgroundColor: `${props.color}` }} // Assuming `a` is some color prop passed to YourComponent
      >
        <Avatar className={props.classes.avatar}>
          <CardMembershipIcon />
        </Avatar>
        <Typography className={props.classes.heading}>{messages.certificateLabel}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CertificateCapture shouldCapture={props.abc === "a5"} />
      </AccordionDetails>
    </Accordion>
  }
  if (props.label === "Feedback") {
    return (
      <>
      <Accordion disabled={!props.data.result} onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
           <AccordionSummary
          expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
          aria-controls=""
          id=""
        >
           <Avatar className={props.classes.avatar}>
            <TextsmsIcon />
          </Avatar>
          <Typography className={props.classes.heading}>{props.label}<span style={{color:"red"}}>*</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{padding:"10px"}}>
          <Textarea 
              margin="normal"
              required
              fullWidth
              id="feedback"
              name="feedback"
              placeholder="ഈ കോഴ്സിനെക്കുറിച്ചുള്ള താങ്കളുടെ അഭിപ്രായങ്ങളും നിർദ്ദേശങ്ങളും ഇവിടെ ചേർക്കുക"
              onChange={(e) => setFeedbackText(e.target.value)}
              value={feedbackText}
              error={errors.feedback ?? ""}
              inputProps={{ style: { fontSize: "10px" } }}
          /></div>
                                {feedbackSubmittedText && <Typography style={{color:"green",margin:"10px"}}>{feedbackSubmittedText}</Typography>}

          <Button 
          variant='contained' 
          style={{  margin: '10px', textTransform: 'none', alignSelf:"flex-end" }}
          color='secondary'
          onClick={handleSubmitFeedback}
          >

            {feedbackText?"Edit Feedback":messages.feedbackSubmitLabel}
          </Button>
        </AccordionDetails>
      </Accordion>
      </>
    )
  }
  if (props.label === "Doubt Submission") {
    return (
      <>
      <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
           <AccordionSummary
          expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
          aria-controls=""
          id=""
        >
           <Avatar className={props.classes.avatar}>
            <QuizIcon />
          </Avatar>
          <Typography className={props.classes.heading}>{props.label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div style={{ padding: '10px' }}>
        <TextField 
          margin="normal"
          fullWidth
          id="doubtClearance"
          name="doubtClearance"
          placeholder={messages.doubtClearancePlaceholderText}
          onChange={(e) => setDoubtClearanceText(e.target.value)}
          value={doubtClearanceText}
          error={!!errors.doubtClearance}
          helperText={errors.doubtClearance ?? ""}
          multiline
          rows={3} 
          style={{ padding: "10px" }}
        />
          <Button 
          variant='contained' 
          style={{  margin: '10px', textTransform: 'none', alignSelf:"flex-end" }}
          color='secondary'
          onClick={()=>{if(props.handleDoubtClearance(doubtClearanceText))setDoubtClearanceText("")}}
          >
            {messages.doubtClearanceSubmitLabel}
          </Button>
          </div>
          <div style={{ padding: '10px' }}>
          {
            props?.doubtData?.map((x, i) =>
              <Accordion key={i} expanded={qEexpanded === `s${i}`} onChange={qHandleChange(`s${i}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                  aria-controls=""
                  id=""
                  style={{ backgroundColor: 'lightgray' }}
                >
                  <Typography className={classes.heading}>{x.doubt}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ padding: '25px' }}>
                    <Typography variant="body1" color="initial">{x.answer}</Typography>
                  </div>
                </AccordionDetails>
              </Accordion>
            )
          }

            </div>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
  if (props.label === "Model Exam") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <EditNoteRoundedIcon />
            </Avatar>
            <Typography className={props.classes.heading}>{props.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant='contained'
              style={{ margin: '10px', textTransform: 'none', alignSelf: 'center', backgroundColor: '#00A881', color: "white" }}
              color='secondary'
              onClick={props.handleClickOpen}
            >
              Start Model Exam
            </Button>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  if (props.label === "Final Exam") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <DrawRoundedIcon />
            </Avatar>
            <Typography className={props.classes.heading}>{props.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant='contained'
              style={{ margin: '10px', textTransform: 'none', alignSelf: 'center', backgroundColor: '#00A881', color: "white" }}
              color='secondary'
              onClick={props.handleClickOpen}
            >
              Start Final Exam
            </Button>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  if (props.label === "Review") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <SchoolIcon />
            </Avatar>
            <Typography className={props.classes.heading}>{props.moduleDetails.module_type}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionDetails>
              <ClassReferenceQuestionTab course={props.course} moduleId={props.moduleDetails.module_id} moduleDetails={props.moduleDetails} />
            </AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  if (props.label === "Course Details") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <SchoolIcon />
            </Avatar>
            <Typography className={props.classes.heading}>{props.course_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ padding: '25px' }}>
              <div dangerouslySetInnerHTML={{ __html: props.course_data }} />
            </div>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
  if (props.label === "Study Planner") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <SchoolIcon />
            </Avatar>
            <Typography className={props.classes.heading}>{props.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <NameField>
              <Typography style={{
                fontWeight: "bold",
                marginBottom: "10px"
              }}>1) ക്ലാസ് പ്രക്ഷേപണം ചെയ്യുന്ന ദിവസം കേൾവിക്കും പഠനത്തിനുമായി നിങ്ങളെ  ഓർമപ്പെടുത്തേണ്ട സമയം തെരഞ്ഞെടുക്കുക.
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker defaultValue={dayjs("2022-04-17T" + props.time)} onChange={(e) => props.setTime(e.format('HH:mm'))} value={dayjs("2022-04-17T" + props.time)} />
              </LocalizationProvider>
            </NameField>
            <NameField>
              <Typography style={{
                fontWeight: "bold"
              }}>2) ഏത് രൂപത്തിലുള്ള reminder സംവിധാനമാണ് നിങ്ങൾ ആഗ്രഹിക്കുന്നത്. (ആവശ്യമായവ ടിക്ക് ചെയ്യുക)
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.whatsApp} disabled={props.type.sms || props.type.reminder_call} />} label="WhatsApp Message" name='whatsApp' />
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.sms} disabled={props.type.whatsApp || props.type.reminder_call} />} label="SMS" name='sms' />
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.reminder_call} disabled={props.type.whatsApp || props.type.sms} />} label="Reminder Call" name='reminder_call' />
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.email} disabled={!user.selectedUser.email} />} label={user.selectedUser.email ? "E-mail" : "E-mail (താങ്കൾ ഇമെയിൽ നൽകിയിട്ടില്ല)"} name='email' />
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.popup} />} label="Pop-up from App" name="popup" />
                <FormControlLabel control={<Checkbox onChange={props.setType} checked={props.type.notification} />} label="Notification" name="notification" />
              </FormGroup>
            </NameField>
            <Button variant="contained" onClick={props.onSubmit} style={{
              textTransform: 'none',
              backgroundColor: "rgb(148 233 213)", color: "black", width: "40%", margin: "1rem 10%", fontSize: "13px"
            }}
            >{props.isEdit ? "Edit Settings" : "Apply Settings"}</Button>
          </AccordionDetails>
        </Accordion>
        <Popup message={props.message} open={props.open} setOpen={props.setOpen} noClose={true} />
      </>
    )
  }
  if (props.label === "Result") {
    console.log(props.data.result)
    const assignmentRow = props.data.result?.assignment_mark.toFixed(2) > 0
  ? `<tr>
       <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd;">Assignment ലെ മാർക്ക്</td>
       <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd;">${props.data.result.assignment_mark.toFixed(2)}</td>
     </tr>`
  : '';

const reviewRow = props.data.result?.review_mark.toFixed(2) > 0
  ? `<tr>
       <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd;">Review</td>
       <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd;">${props.data.result.review_mark.toFixed(2)}</td>
     </tr>`
  : '';

const htmlData = `
  <table class="tg" style="width: 100%; border-collapse: collapse; text-align: left; font-family: Arial, sans-serif; margin-top: 20px;">
    <thead>
      <tr>
        <th class="tg-0lax" style=" color: black; padding: 10px; border: 1px solid #ddd;">ക്ലാസ് ടെസ്റ്റുകൾക്ക് ലഭിച്ച ആകെ മാർക്ക്</th>
        <th class="tg-0lax" style=" color: black; padding: 10px; border: 1px solid #ddd;">${props.data.result?.class_test_mark.toFixed(2)}</th>
      </tr>
    </thead>
    <tbody>
      ${assignmentRow}
      ${reviewRow}
      <tr>
        <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">പൊതുപരീക്ഷയിലെ ആകെ മാർക്ക്</td>
        <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">${props.data.result?.final_mark.toFixed(2)}</td>
      </tr>
      <tr>
        <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2; font-weight: bold;">Total</td>
        <td class="tg-0lax" style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2; font-weight: bold;">${props.data.result?.total_mark.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

`;

const weighageHtml=`<h5>ക്ലാസ് ടെസ്റ്റുകൾക്ക് 40% നും പൊതു പരീക്ഷക്ക് 60% നുമാണ് Weightage നിശ്ചയിച്ചിരിക്കുന്നത്:</h5>

    <table>
        <thead>
            <tr>
                <th class="tg-0lax" style=" color: black; padding: 10px; border: 1px solid #ddd;">ക്ലാസ് ടെസ്റ്റുകൾക്ക് ലഭിച്ച ആകെ മാർക്ക്</th>
                <th class="tg-0lax" style=" color: black; padding: 10px; border: 1px solid #ddd;">Scored / Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">Weightage നൽകിക്കിയ ശേഷം ക്ലാസ് ടെസ്റ്റുകളുടെ ആകെ മാർക്ക്</td>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">${props.data.result?.class_test_mark.toFixed(2)} / 40</td>
            </tr>
            <tr>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">പൊതു പരീക്ഷയിൽ ലഭിച്ച ആകെ മാർക്ക്</td>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">${props.data.result?.raw_final_mark.toFixed(2)} / ${props.data.result?.max_final_mark.toFixed(2)}</td>
            </tr>
            <tr>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">Weightage നൽകിക്കിയ ശേഷമുള്ള പൊതു പരീക്ഷയുടെ ആകെ മാർക്ക്</td>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">${props.data.result?.final_mark.toFixed(2)} / 60</td>
            </tr>
            <tr>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">Weightage നൽകിക്കിയ ശേഷമുള്ള ആകെ മാർക്ക്</td>
                <td class="tg-0lax" style=" color: black;padding: 10px; border: 1px solid #ddd;">${props.data.result?.total_mark.toFixed(2)} / 100</td>
            </tr>
        </tbody>
    </table>`

    return (
      <>
        <Accordion disabled={!props.data.result} onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <QuestionAnswerIcon />
            </Avatar>
            <Typography className={props.classes.heading}>Result</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ padding: '25px' }}>
              <div dangerouslySetInnerHTML={{ __html: htmlData }} />
            </div>
            {weighageExpanded&& <div style={{ padding: '25px' }}>
              <div dangerouslySetInnerHTML={{ __html: weighageHtml }} />
            </div>}
            <button style={{ float: 'right', margin: '10px 100px', border: '0px solid #ddd', backgroundColor:"#ffffff"}} onClick={() => setWeighageExpanded(!weighageExpanded)}>{weighageExpanded ? "Show Less" : "Show More"}</button>

          </AccordionDetails>
        </Accordion>

      </>
    )
  }
  if (props.label === "Enrollment Details") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <PauseCircleFilledIcon />
            </Avatar>
            <Typography className={props.classes.heading}>Course Drop</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ padding: '25px' }}>
              <Typography style={{ marginBottom: '15px' }}>ഒരു സമയം 3 കോഴ്സുകളിൽ മാത്രമേ Enroll ചെയ്ത് പഠിക്കാൻ അവസരം ഉള്ളൂ. ഇത്തരം സാഹചരത്തിൽ നിലവിൽ Enroll ചെയ്ത ഏതെങ്കിലും ഒരു കോഴ്സ് Drop ചെയ്ത ശേഷം മാത്രമേ മറ്റൊരു കോഴ്സിൽ Enroll ചെയ്യാൻ സാധിക്കൂ. അതുപോലെ വ്യത്യസ്ത കാരണങ്ങളാൽ താൽക്കാലികമായി ഈ കോഴ്സ് പഠിക്കാൻ സാധിക്കാതെ വരുന്നവർക്കും ഈ സംവിധാനം ഉപയോഗപ്പെടുത്താം.
                <br /> <br />

                Drop ചെയ്ത കോഴ്സുകൾ Exclusive course കളിൽ നിന്ന് ആവശ്യമെങ്കിൽ വീണ്ടും Enroll ചെയ്ത് പഠനം തുടരാവുന്നതാണ്

              </Typography>
              <Button style={{
                backgroundColor: "red",
                color: "white", textTransform: 'none'
              }}
                variant="outlined"
                onClick={async () => {
                  props.setMessage("Course drop ചെയ്യാൻ Confirm ബട്ടൺ ക്ലിക്ക് ചെയ്യുക.")
                  props.setOpen(true)

                }}
              >
                Course Drop
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Popup message={props.message} open={props.open} setOpen={props.setOpen} onSuccessHandler={async () => {
          const res = await courseUnEnroll(props.data.id, user.selectedUser.id);
          if (res?.status) {
            navigate("/")
          }
        }} />


      </>
    )
  }
  if (props.label === "Course Reset") {
    return (
      <>
        <Accordion onChange={props.fn(props.idd)} expanded={props.abc === props.idd} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={props.classes.expandIcon} />}
            aria-controls=""
            id=""
          >
            <Avatar className={props.classes.avatar}>
              <ReplayIcon />
            </Avatar>
            <Typography className={props.classes.heading}>Course Reset</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ padding: '25px' }}>
              <Typography style={{ marginBottom: '15px' }}>കോഴ്സ reset ഓപ്ഷൻ വളരെ ശ്രദ്ധിച്ചു മാത്രം ഉപയോഗിക്കുക. ഒരിക്കൽ Reset ചെയ്തു കഴിഞ്ഞാൽ പിന്നീട് ഇതുവരെ നിങ്ങൾ കോഴ്സിൻ്റെ ഭാഗമായി ചെയ്ത മുഴുവൻ പ്രവർത്തനങ്ങളും നഷ്ടപ്പെടുകയും വീണ്ടും ഒന്നിൽ നിന്ന് ആരംഭിക്കുകയും ചെയ്യേണ്ടി വരും. 
                <br /> <br />
              </Typography>
              <Button style={{
                backgroundColor: "red",
                color: "white", textTransform: 'none'
              }}
                variant="outlined"
                onClick={async () => {
                  props.setMessage("Course Reset ചെയ്യാൻ Confirm ബട്ടൺ ക്ലിക്ക് ചെയ്യുക.")
                  props.setOpen(true)

                }}
              >
                Course Reset
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Popup message={props.message} open={props.open} setOpen={props.setOpen} onSuccessHandler={async () => {
          const res = await courseReset(props.data.id, user.selectedUser.id);
          if (res?.status) {
            navigate("/")
          }
        }} />


      </>
    )
  }
}

export default Menu
