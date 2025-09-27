import React from 'react'
import { useSelector } from 'react-redux'
import ResumeUpload from '../Components/ResumeUpload'
import InfoGatheringForm from '../Components/InfoGatheringForm'
import InterviewLobby from '../Components/InterviewLobby'

const IntervieweePage = () => {
  const interviewStatus=useSelector((state)=>state.interview.interviewStatus)
  console.log(interviewStatus)

  const renderContent = () =>{
     switch (interviewStatus) {
      case 'pending-resume':
        return <ResumeUpload />;
      case 'info-gathering':
        return <InfoGatheringForm/>; 
      case 'ready-to-start':
         return <InterviewLobby/>;
      case 'in-progress':
        return <div>Interview in Progress...</div>;
      case 'completed':
        return <div>Interview Completed!</div>;
      default:
        return <ResumeUpload />;
    }
  }
  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default IntervieweePage