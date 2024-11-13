import React, { useContext, useEffect, useState } from 'react';
import moduleTabFetch from '../../utils/moduletab';
import { UserContext } from '../../contexts/UserContext';
import { CourseContext } from '../../contexts/CourseContext';
import ModuleTabAccordion from './ModuleTabAccordion';
// import { makeStyles} from '@material-ui/core/styles';
import ListSkeleton from '../../ui/ListSkeleton';
import homeTabFetch from '../../utils/hometab';

const ModuleTab = () => {
  const [loader, setLoader] = useState(false);
  // const [ moduleTabData, setModuleTabData ] = useState(null)

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     color: theme.palette.primary.dark
  //   }
  // })) 

  // useEffect(() => {
  //   // setLoader(true);
  //   async function getModuleTabData() {
  //     // console.log(`ModuleTab`)
  //     const res = await moduleTabFetch(window.myToken, course.selectedCourse.type, user.memberList[user.selectedUser].rollNumber);
  //     // setModuleTabData(res)
  //     setLoader(false);
  //     setCourse({ ...course, moduleTabData: res })
  //   }
  //   // getModuleTabData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // console.log(course, 'tHome')



  return (
    <React.Fragment>
      {(!loader) ?
        <ModuleTabAccordion  /> :
        <ListSkeleton />}
    </React.Fragment>
  )
}

export default ModuleTab
