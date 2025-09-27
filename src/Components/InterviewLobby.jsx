// src/components/InterviewLobby.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Typography } from 'antd';
import { startInterview } from '../Redux/interviewSlice';


const { Title, Paragraph } = Typography;

const InterviewLobby = () => {
  const dispatch = useDispatch();
  const candidateInfo = useSelector((state) => state.interview.candidateInfo);

  const handleStart = () => {
    dispatch(startInterview());
  };

  return (
    <Card style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
      <Title level={3}>You're All Set, {candidateInfo.name}!</Title>
      <Paragraph>The interview will consist of 6 questions for a Full Stack role.</Paragraph>
      <Paragraph>
        You will be timed for each question:
        <ul style={{ paddingLeft: '20px', listStylePosition: 'inside' }}>
            <li>Easy questions: 20 seconds</li>
            <li>Medium questions: 60 seconds</li>
            <li>Hard questions: 120 seconds</li>
        </ul>
      </Paragraph>
      <Paragraph>
        When the timer runs out, your answer will be submitted automatically. Good luck!
      </Paragraph>
      <Button type="primary" size="large" onClick={handleStart}>
        Start the Interview
      </Button>
    </Card>
  );
};

export default InterviewLobby;