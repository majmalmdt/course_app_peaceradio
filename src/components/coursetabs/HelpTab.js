import React, { useEffect, useState } from 'react'
import Faq from './HelpCards/Faq'
import LateExamRequest from './HelpCards/LateExamRequest';
import Sample from './HelpCards/Sample';
import Menu from '../firdous/Menu'
import { makeStyles } from '@material-ui/core/styles';
import personalSP from '../../utils/personalSP';
import { UserContext } from '../../contexts/UserContext';
import { CourseContext } from '../../contexts/CourseContext';
import { useContext } from 'react';
import submitDoubt from '../../utils/submitDoubt'
import homeTabFetch from '../../utils/hometab';

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
  subHead: {
    fontSize: theme.typography.pxToRem(13),
    marginLeft: '20px',
    fontWeight: 700,
    // flexShrink: 0,
    color: theme.palette.primary.dark,
    alignSelf: 'center'
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
}))

const HelpTab = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [expanded, setExpanded] = useState('');
  // const [test, setTest] = useState(['Course Work', 'Review']) 
  const { user } = useContext(UserContext);
  const { course, setCourse } = useContext(CourseContext);
  const classes = useStyles();
  const [time, setTime] = useState(course?.psp?.[0]?.time ? course?.psp?.[0]?.time : "15:30");
  const [type, setType] = useState({
    whatsApp: false,
    sms: false,
    email: false,
    popup: false,
    notification: false,
    reminder_call: false
  })
  console.log(course)

  useEffect(() => {
    const keysArray = course?.psp?.[0]?.type.split(', ').map(key => key.trim());

    keysArray?.forEach(key => {
      if (type.hasOwnProperty(key)) {
        setType((prevState) => {
          return { ...prevState, [key]: true }
        })
      }
    });
  }, [])


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitPSP = async () => {
    const typeString = Object.keys(type)
      .filter(key => type[key]) // Filter keys with true values
      .join(', ');
    const result = await personalSP(course?.id, user.selectedUser.id, time, typeString)
    if (result.status) {
      setMessage("താങ്കൾ നൽകിയ വിവരങ്ങൾ സ്വീകരിച്ചിരിക്കുന്നു.")
      setOpen(true)
    }
  }

  const handleDoubtClearance = async (doubtClearanceText) => {
    if (doubtClearanceText) {
      const res = await submitDoubt(course?.id, user?.selectedUser?.id, doubtClearanceText)
      if (res.status) {
        const resCourse = await homeTabFetch(course.id, user?.selectedUser.id);
        setCourse(resCourse.data);
        return true;
      }
    }
  }

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;

    setType((prevState) => {
      if (name === 'sms' && checked) {
        return {
          ...prevState,
          [name]: checked,
          whatsApp: false,
          reminder_call: false // Disable WhatsApp when SMS is checked
        };
      } else if (name === 'whatsApp' && checked) {
        return {
          ...prevState,
          [name]: checked,
          sms: false,
          reminder_call: false // Disable SMS when WhatsApp is checked
        };
      } else if (name === 'reminder_call') {
        return {
          ...prevState,
          [name]: checked,
          sms: false,
          whatsApp: false // Disable SMS when WhatsApp is checked
        };
      }
      else {
        return {
          ...prevState,
          [name]: checked,
        };
      }
    });
  }
  return (
    <div style={{ margin: '10px' }}>
      <Faq id='h1' handleChange={handleChange} expanded={expanded} faqData={[...(course?.faqs || []), ...(course?.generalOptions?.FAQ || [])]} />
      <Menu label="Study Planner" classes={classes} fn={handleChange} abc={expanded} isEdit={course?.psp?.[0]?.time} idd="a2" time={time} type={type} setTime={setTime} setType={handleTypeChange} onSubmit={submitPSP} open={open} message={message} setOpen={setOpen} />
      <LateExamRequest id='h2' handleChange={handleChange} expanded={expanded} course={course} />
      <Sample id='h3' label='Testimonials' handleChange={handleChange} expanded={expanded} data={[...(course?.testimonials || []), ...(course?.generalOptions?.Testimonial || [])]} />
      <Menu classes={classes} data={course} label="Doubt Submission" fn={handleChange} abc={expanded} idd="a3" doubtData={course?.doubts} handleDoubtClearance={handleDoubtClearance} />
      {course.end_time && new Date(course.end_time) < new Date() && (
        <Menu
          classes={classes}
          data={course}
          label="Enrollment Details"
          fn={handleChange}
          abc={expanded}
          idd="a4"
          doubtData={course?.doubts}
          handleDoubtClearance={handleDoubtClearance}
          open={open}
          setMessage={setMessage}
          message={message}
          setOpen={setOpen}
        />
      )}
          {/* {course.end_time && new Date(course.end_time) < new Date() && (
        <Menu
          classes={classes}
          data={course}
          label="Course Reset"
          fn={handleChange}
          abc={expanded}
          idd="a5"
          doubtData={course?.doubts}
          handleDoubtClearance={handleDoubtClearance}
          open={open}
          setMessage={setMessage}
          message={message}
          setOpen={setOpen}
        />
      )} */}
      

    </div>
  )
}

export default HelpTab
