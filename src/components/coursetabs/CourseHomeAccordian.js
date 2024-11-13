import React, {useEffect, useState,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Typography,Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import moduleTabFetch  from '../../utils/moduletab';
import { UserContext } from '../../contexts/UserContext';
import Menu from "../firdous/Menu"
import ClassReferenceQuestionTab from "../coursetabs/ModuleTabQuestionClassReference"
import { CourseContext } from '../../contexts/CourseContext';
import SchoolIcon from '@material-ui/icons/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { toPng } from 'html-to-image';
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: "10px 10px",
  },
  summary: {},
  expanded: {
    margin: "0px 0",
    color: "red",
    "&$expanded": {
      margin: "0px 0 0px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: "100%",
    fontWeight: 700,
    flexShrink: 0,
    color: theme.palette.primary.dark,
  },
  detailText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
  },
  detail: {
      gap: "16px" 
    
  },

  accordionRoot: {
    backgroundColor: "white",
    color: theme.palette.primary.dark,
    margin: "0",
    "&.Mui-expanded": {
      // backgroundColor: 'red',
      margin: "6px 0",
    },
  },
  headingIcon: {
    fontSize: 20,
    paddingRight: "10px",
    alignSelf: "center",
    color: theme.palette.primary.main,
  },
  avatar: {
    fontSize: 20,
    alignSelf: "center",
    color: theme.palette.primary.main,
  },
}));

const CourseHomeAccordion = () => {
  const classes = useStyles();
  const [activeExam,setActiveExam]=useState({})
  const { user } = useContext(UserContext);
  const { course } = useContext(CourseContext)
  const [expanded, setExpanded] = useState('panel3');
  const [announcement, setAnnouncement] = useState([]);
  const [open, setOpen] = useState(false);

  // const handleExpand = (value) => {
  //   if (expanded) {
  //   if (expanded.includes(value))
  //     setExpanded(expanded.filter(item => item !== value));
  //   else{
  //     if (expanded.length===2)
  //       setExpanded([...expanded.slice(1),value])
  //     else
  //       setExpanded([...expanded,value])
  //   }
  // }else 
  //   setExpanded([value]);
  // }
  const handleChange = (panel, index) => async(event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const activeCourseEvent=()=>{
    
    if(course?.featured_type==="Final" || (course?.course_end_time && activeExam.module_type==="Final")){
      return <Menu classes={classes} label="Final Exam" fn={handleChange} abc={expanded} idd="a2" handleClickOpen={handleClickOpen} />
    }
    if(course?.featured_type==="Model" || (course?.course_end_time && activeExam.module_type==="Model")) {
      return  <Menu classes={classes} label="Model Exam" fn={handleChange} abc={expanded} idd="a2" handleClickOpen={handleClickOpen} />

    }
    if(course?.featured_type==="Feedback"){

    }
    if(course?.featured_type==="Certificate"){

    }
    if(course?.featured_type==="Class" || (course?.course_end_time && activeExam.module_type==="Class")) {
      return(
      <Accordion className={{ expanded: classes.expanded, root: classes.accordionRoot }} expanded={expanded === `panel3`} onChange={handleChange("panel3")
        }>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
            aria-controls=""
            id=""
            className={classes.summary}
          >
            <SchoolIcon className={classes.headingIcon} />
            <div>
            <Typography className={classes.heading}>Class {activeExam.module_no}</Typography>
            <Typography style={{fontSize:"14px"}}>{activeExam?.class_name}</Typography>
            </div>
            {/* <Typography className={classes.secondaryHeading}>
                          You are currently not an owner
                      </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
          <ClassReferenceQuestionTab course={course} module={activeExam.questions} moduleId={activeExam.id} reference={activeExam.reference} isLoading={!activeExam}  moduleDetails={activeExam.moduleDetails}/>
    
          </AccordionDetails>
        </Accordion>)
    }
    if(course?.featured_type==="Assignment"){

    }

    // <Accordion className={{ expanded: classes.expanded, root: classes.accordionRoot }} expanded={expanded.includes(2)} onChange={()=>{handleExpand(2)
    // }}>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
    //     aria-controls=""
    //     id=""
    //     className={classes.summary}
    //   >
    //     <AssignmentIcon className={classes.headingIcon} />
    //     <Typography className={classes.heading}>{activeF}</Typography>
    //     {/* <Typography className={classes.secondaryHeading}>
    //                   You are currently not an owner
    //               </Typography> */}
    //   </AccordionSummary>
    //   <AccordionDetails>
    //   <ClassReferenceQuestionTab module={activeExam.questions} moduleId={activeExam.id} reference={activeExam.reference} isLoading={!activeExam}/>

    //   </AccordionDetails>
    // </Accordion>
  }

  const getFeaturedClass=async()=>{
    
    const featuredClass = course?.course_end_time ? course?.modules.find(item=>item.examstatus==="notAnswered") :course?.modules?.filter(item => item.featured === 1);
    if (featuredClass?.length > 0) {
      const { module_id, reference, module_no, class_name } = featuredClass[0];
      const data = await moduleTabFetch(module_id, user?.selectedUser?.id);
      
      setActiveExam({
        questions: data.data,
        reference,
        id: module_id,
        module_no,
        class_name,
        moduleDetails: featuredClass[0]
      });
      }
  }

  const getActiveExam=async ()=>{

    
  const today = new Date(); 
  if (!course.modules || !today) {
    return null;
  }
  if(course?.course_end_time){
    const module = course.modules.find(item => item.examstatus === "notAnswered");
    const data= await moduleTabFetch(module?.module_id,user?.selectedUser?.id);
      setActiveExam({questions:data.data,reference:module?.reference,id:module?.module_id,module_no:module?.module_no,class_name:module?.class_name,moduleDetails:module})
      return module;
  }
  else{
  for (const module of course.modules) {
    const startDate = new Date(module.start_time); 
    const endDate = new Date(module.end_time); 
    
    if (today >= startDate && today <= endDate) {
      const data= await moduleTabFetch(module.module_id,user?.selectedUser?.id);
      setActiveExam({questions:data.data,reference:module.reference,id:module.module_id,module_no:module?.module_no,class_name:module.class_name,moduleDetails:module})
      return module;
    }
  }
}

  return null;
  }
  useEffect(()=>{
    activeCourseEvent()
    getActiveExam()
    getFeaturedClass()
    course.announcements && setAnnouncement(course?.announcements)
  },[announcement, course])
  

  const handleDownload = (divData) => {
    if (divData === null) {
      return;
    }

    toPng(divData)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'div-image.png';
        link.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong!', err);
      });
  };

  return (
    <div className={classes.root}>
      {/* <div style={{ color: "red" }}>firdous</div> */}
      <Accordion
        expanded={expanded === `panel1`}
        onChange={
          handleChange(`panel1`)
        }
        className={{ expanded: classes.expanded, root: classes.accordionRoot }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
          aria-controls=""
          id=""
          className={classes.summary}
        >
          {announcement && (
            <Badge badgeContent={announcement?.length} color="error">
              <MailIcon className={classes.avatar} />
            </Badge>
          )}

          <Typography
            className={classes.heading}
            style={{ marginLeft: "10px" }}
          >
            Announcements
          </Typography>
        </AccordionSummary>
        {announcement.map((data,index)=>{
          return <AccordionDetails key={index} className={classes.detail}>
            <div style={{display:"flex",flexDirection: "column",alignItems:"center"}}>
            {data.file_url&&<img
                srcSet={`${data.file_url}`}
                src={`${data.file_url}`}
                alt={data.title}
                loading="lazy"
                width= "300px"
                height= "300px"
                />}
            <Typography className={classes.detailText} style={{fontWeight:'bold'}}>
            {data.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </div>
            </AccordionDetails>
        })}
      </Accordion> 
      
      {activeCourseEvent()}
      <Accordion
        expanded={expanded === `panel2`}
        onChange={handleChange(`panel2`)} 
        className={{ expanded: classes.expanded, root: classes.accordionRoot }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
          aria-controls=""
          id=""
          className={classes.summary}
        >
          <AssignmentIcon className={classes.avatar} />
          <Typography className={classes.heading} style={{ marginLeft: "10px" }} >
            Instructions
          </Typography>
          {/* <Typography className={classes.secondaryHeading}>
                        You are currently not an owner
                    </Typography> */}
        </AccordionSummary>
        {course &&
          course?.instructions?.map((data, index) => {
            return (
              <AccordionDetails key={index} >
                <div>
                <Typography className={classes.detailText} style={{
                  textAlign:"center",
                  fontWeight:"bold",
                  fontSize:"18px"
                }}>
                  {data.title}
                  </Typography>
                  <Typography className={classes.detailText}>
                  <div dangerouslySetInnerHTML={{ __html: data.html }} />
                </Typography>
                </div>
              </AccordionDetails>
            );
          })}
      </Accordion>
      <Accordion
         expanded={expanded === `panel4`}
         onChange={handleChange(`panel4`)} 
        className={{ expanded: classes.expanded, root: classes.accordionRoot }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
          aria-controls=""
          id=""
          className={classes.summary}
        >
          <CalendarMonthIcon className={classes.avatar} />
          <Typography className={classes.heading}             style={{ marginLeft: "10px" }}
          >
           Course Planner
          </Typography>
          {/* <Typography className={classes.secondaryHeading}>
                        You are currently not an owner
                    </Typography> */}
        </AccordionSummary>
        {course &&
          course?.course_calender?.map((data, index) => {
            return (
              <AccordionDetails key={index} >
                <div style={{
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  flexDirection:"column"
                }}>
                <div
                  style={{
                    overflow: 'auto',      // Allows scrollbars if content overflows
                    maxHeight: '400px',    // Set a maximum height to control the content height
                    maxWidth: '100%',      // Ensure the width doesn't exceed the container
                    whiteSpace: 'normal',  // Ensures text wraps normally
                  }}
                  dangerouslySetInnerHTML={{ __html: data.html }}
                />   
                 <Button
                      variant='contained' style={{ width: '25%', margin: '10px auto', textTransform: 'none', textAlign: "center" }} color='primary'
                      onClick={() =>handleDownload(data.html)}>
                    
                      Download
                    </Button>
                    </div>           
              </AccordionDetails>
            );
          })}
      </Accordion>
      {course.future_card && course.future_card.length > 0  && <Accordion
         expanded={expanded === `panel5`}
         onChange={handleChange(`panel5`)} 
        className={{ expanded: classes.expanded, root: classes.accordionRoot }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
          aria-controls=""
          id=""
          className={classes.summary}
        >
          <AssignmentIcon className={classes.avatar} />
          <Typography className={classes.heading}>Future Card</Typography>
          {/* <Typography className={classes.secondaryHeading}>
                        You are currently not an owner
                    </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
        {course &&
          course?.future_card?.map((data, index) => {
            return (
              <AccordionDetails key={index} className={classes.detail}>
                  <div dangerouslySetInnerHTML={{ __html: data.html }} />
              </AccordionDetails>
            );
          })}
        </AccordionDetails>
      </Accordion>
      }
      
    </div>
  );
};

export default CourseHomeAccordion;
