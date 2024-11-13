import React, { useRef, useState, useEffect,useContext } from 'react';
import html2canvas from 'html2canvas';
import { UserContext } from '../../contexts/UserContext';
import { CourseContext } from '../../contexts/CourseContext';
import getCertificate from "../../utils/certificate"

const CertificateCapture = ({ shouldCapture}) => {
    const captureRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);
    const {user} = useContext(UserContext)
    const {course} = useContext(CourseContext)
    const [certDetail,setCertDetail] = useState({})

    useEffect(()=>{
      const handleCertificate=async ()=>{
        const certData= await getCertificate(course.type,"GOLD",user.selectedUser.id,course.id)
        if(certData.status)
          setCertDetail(certData.data)
      }
      if(user && course){
        handleCertificate()
      }
    },[])
    useEffect(() => {
      if (shouldCapture && captureRef.current) {
        html2canvas(captureRef.current, { useCORS: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            setImageUrl(imgData);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'certificate.png';
            link.click();
          })
          .catch((error) => {
            console.error('Error capturing image:', error);
          });
      }
    }, [shouldCapture]); // Only trigger when shouldCapture is true
  
    return (
      <div>
        {!imageUrl && (
          <div
            ref={captureRef}
            style={{
              position: 'relative',
              width: '1000px',
              height: '700px',
              backgroundImage: `url(${certDetail?.link})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
              margin: '0 auto',
              padding: '20px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '80%',
                top: '35%',
                left: '10%',
                textAlign: 'center',
                color: '#000000',
                fontSize: '24px',
                lineHeight: '1.5',
              }}
            >
              <p>
              <strong>{user?.sex==="male"?"Mr. ":"Mrs. "}{user?.selectedUser?.name}</strong> with Roll No: <strong>{user?.selectedUser?.roll_number}</strong>
              </p>
              <p>
              has Successfully completed the Peace Radio <strong>{course?.course_name_eng?.split(" ")[0]}</strong>
              </p>
              <p>
                <strong>{course?.course_name_eng?.split(" ")[1]}</strong> with an aggregate of <strong>{course?.result?.total_mark}% marks</strong>
              </p>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '170px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 10%',
                fontSize: '18px',
                color: '#000000',
              }}
            >
              <div style={{ position: 'absolute', left: '13%' }}>
                <p>
                  Date: <strong>2024-08-25</strong>
                </p>
              </div>
              <div style={{ position: 'absolute', right: '32%' }}>
                <p>
                Certificate No: <strong>{certDetail?.number}</strong>
                </p>
              </div>
            </div>
          </div>
        )}
        {imageUrl && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <img src={imageUrl} alt="Downloaded Certificate" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    );
  };
  

export default CertificateCapture;


