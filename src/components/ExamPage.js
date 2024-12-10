import { makeStyles } from '@material-ui/core/styles';
import { useTimer } from 'use-timer';
import { Container, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import QuestionDisplay from './coursetabs/QuestionDisplay';
import getExam from '../utils/getExam';
import moduleTabFetch from '../utils/moduletab';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import Popup from "./firdous/Popup";
import {useNavigate} from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
  },
  mainRoot: {
    marginTop: '60px', // Ensure this matches the height of your Navbar
  },
  timerContainer: {
    position: 'sticky',
    top: "3.5rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows[4],
  },
 
}));

export default function ExamPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const {course}= useContext(CourseContext)

  const [questions, setQuestions] = useState([]);
  const classes = useStyles();
  const { time, start, reset, status } = useTimer({
    initialTime: 7200,
    timerType: 'DECREMENTAL',
  });

  const remainingTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const module= course.modules.filter((item)=>item.module_id.toString()===courseId)

  useEffect(() => {
    const initializeExam = async () => {
      const examRes = await getExam(courseId, user?.selectedUser?.id);
      if (examRes.status) {
        const remainingTime = examRes.data.exam_duration*60;  // Assuming this comes from the API
        reset(remainingTime, false);
        start();
      }
      else{
        setMessage(examRes.message)
        setOpen(true)
      }

      const quesRes = await moduleTabFetch(courseId, user?.selectedUser?.id);
      setQuestions(quesRes.data.length > 0 ? quesRes.data : []);
    };

    initializeExam();

    if (time < 0 && status === "RUNNING") {
      reset();
    }
  }, [courseId, user?.selectedUser?.id]);

  return (
    <Container className={classes.root}>
      <div className={classes.timerContainer}>
        <Typography style={{
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color:"white"
  }}>
          {remainingTime(time)}
        </Typography>
      </div>
      <Container m={2} className={classes.mainRoot}>
        <QuestionDisplay qsObj={questions} course={course} moduleDetails={module[0]} moduleId={module[0].module_id} />
      </Container>
      <Popup message={message} open={open} setOpen={setOpen} onSuccessHandler={()=>{
        navigate("/")
      }} noClose={true}/>
    </Container>
  );
}
