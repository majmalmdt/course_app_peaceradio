import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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


const Faq = ({id,handleChange,expanded,faqData}) => {

  const [qEexpanded, setQExpanded] = React.useState(false);
  const classes = useStyles();
  const qHandleChange = (panel) => (event, newExpanded) => {
    setQExpanded(newExpanded ? panel : false);
  };


  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        aria-controls=""
        id=""
      >
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography className={classes.heading}>FAQ</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ padding: '10px' }}>
          {
            faqData?.map((x, i) =>
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
                  <Typography className={classes.heading}>{x.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ padding: '25px' }}>
                  <div dangerouslySetInnerHTML={{ __html: x.html }} />
                  </div>
                </AccordionDetails>
              </Accordion>
            )
          }

        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Faq
