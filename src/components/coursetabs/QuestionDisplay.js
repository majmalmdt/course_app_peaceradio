import React, { useEffect, useState, useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import { UserContext } from '../../contexts/UserContext';
import answerQuestion from '../../utils/answerQuestion';
import answerSubmit from '../../utils/answerSubmit';
import { useNavigate } from "react-router-dom";
import Popup from "../firdous/Popup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  detailText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
    whiteSpace: "pre-line",
  },
  detailQuestionText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.dark,
    whiteSpace: "pre-line",
    marginBottom: "1rem",
    marginTop: "1.8rem",
  },
  detailOptionText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.dark,
    whiteSpace: "pre-line",
  },
  detailOptionRoot: {
    marginBottom: "0.2rem",
  },
  radioRoot: {
    padding: "8px 9px",
  },
  optionGroup: {
    marginBottom: "1rem",
  },
  audioStyles: {
    width: "100%",
  },
  errorHighlight: {
    backgroundColor: '#FFCCCC',
    border: '1px solid red',
    padding: '10px',
    borderRadius: '5px',
  },
  button: {
    textTransform: 'none',
  },
  /* Hide download button in Chrome, Safari */
  audioHideDownload: {
    '&::-webkit-media-controls-enclosure': {
      overflow: 'hidden',
    },
    '&::-webkit-media-controls-panel': {
      width: 'calc(100% - 30px)', // Shrinks the panel to hide download
    },
    '&::-webkit-media-controls-download-button': {
      display: 'none',
    },
    /* Hide download button for Firefox */
    '&::-moz-media-controls-download-button': {
      display: 'none',
    },
  },
}));

function QuestionDisplay({ qsObj = [], moduleId, course, moduleDetails }) {
  const [values, setValues] = useState([]);
  const [lastChanged, setLastChanged] = useState({ id: -1, value: "" });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const optionsLetter = ["A", "B", "C", "D"];

  useEffect(() => {
    setValues(qsObj?.map((item) => ({
      course_question_id: item?.id,
      option_id: item.answer,
    })));
  }, [qsObj]);

  async function setAnswerQuestion(course_question_id, option_id) {
    await answerQuestion(
      course_question_id,
      user?.selectedUser?.id,
      option_id,
      moduleId,
      course?.id,
      moduleDetails?.module_type
    );
  }

  async function setAnswerSubmit() {
    const unAnswered = values.filter((item) => item.option_id === '0');
    if (unAnswered.length) {
      setError(unAnswered.map(item => item.course_question_id));
      return;
    }
    const res = await answerSubmit(values, user?.selectedUser?.id, moduleId, course?.id, moduleDetails?.module_type);
    setMessage(res.message);
    setOpen(true);

  }

  useEffect(() => {
    if (lastChanged.value === "" || lastChanged.id === -1 || !qsObj) return;

    const updatedValues = values.map((value, index) =>
      index === lastChanged.id
        ? { course_question_id: qsObj[lastChanged.id]?.id, option_id: lastChanged.value }
        : value
    );

    setValues(updatedValues);
    setAnswerQuestion(updatedValues[lastChanged.id]?.course_question_id, lastChanged.value);
  }, [lastChanged, qsObj]);

  const handleChange = (id, event) => {
    const newValue = event.target.value;
    if (newValue !== values[id]?.option_id) {
      setLastChanged({ id, value: newValue });
    }
  };

  return (
    <div>
      {qsObj.map((item, index) => (
        <div
          key={item?.id}
          style={error.includes(item.id) ? {
            backgroundColor: '#FFCCCC',
            border: '1px solid white',
            padding: '10px',
            borderRadius: '5px',
          } : item.answer !== '0' || values.some(value => value.course_question_id === item.id && value.option_id !== '0') ? { backgroundColor: '#98E1D0', border: '5px solid white', padding: '10px', borderRadius: '5px' } : {}}

        >
          <Typography className={classes.detailQuestionText}>
            {index + 1}) {item?.question}
          </Typography>
          {item?.question_image && (
            <img
              src={item?.question_image_url}
              alt="Question"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          )}

          {item?.question_audio && (
            <audio controls className={`${classes.audioStyles} ${classes.audioHideDownload}`}>
              <source src={item.question_audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <FormControl component="fieldset" className={classes.optionGroup}>
            <RadioGroup
              aria-label="answer"
              name={`answer${index}`}
              defaultValue={item.answer}
              onChange={(e) => handleChange(index, e)}
            >
              {item?.options?.map((option, i) => (
                <FormControlLabel
                  key={option?.option_id}
                  className={classes.detailOptionRoot}
                  value={`${option?.option_id}`}
                  control={<Radio className={classes.radioRoot} />}
                  label={optionsLetter[i] + ") " + option?.option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Divider />
        </div>
      ))}
      <Typography
        style={{
          textAlign: 'center',
          color: moduleDetails?.examstatus !== "notAnswered" || message ? "green" : "red",
          fontSize: '12px'
        }}
      >
        {moduleDetails?.examstatus !== "notAnswered" || message
          ? "താങ്കളുടെ ഉത്തരങ്ങൾ സ്വീകരിച്ചിരിക്കുന്നു" : "താങ്കൾ ഇത് വരെ ഉത്തരം അയച്ചിട്ടില്ല"}
      </Typography>
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: '1px' }}>
        <Grid item>

          <Button
            variant="outlined"
            style={{ backgroundColor: '#00A881', color: 'white' }}
            className={classes.button}
            onClick={setAnswerSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {message && (
        <Alert style={{ marginTop: "10px" }} variant="filled" severity="success">
          {message}
        </Alert>
      )}
      <Popup message={message} open={open} setOpen={setOpen} onSuccessHandler={() => {
        navigate("/course/" + course?.id + '/1');
      }} noClose={true} />
    </div>

  );
}

export default QuestionDisplay;
