import React from 'react'
import { useSelector } from 'react-redux'
import ResumeUpload from '../Components/ResumeUpload'

const IntervieweePage = () => {
  const interviewStatus=useSelector((state)=>state.interview.InterviewStatus)
  console.log(interviewStatus)

  const renderContent = () =>{
     switch (interviewStatus) {
      case 'pending-resume':
        return <ResumeUpload />;
      case 'info-gathering':
        return <div>Information Gathering Form</div>; 
      case 'ready-to-start':
         return <div>Ready to Start Interview</div>;
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