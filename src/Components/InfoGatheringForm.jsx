import React from 'react'
import { Form, Input, Button, Card, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmCandidateInfo } from '../Redux/interviewSlice';

const { Title } = Typography;

const InfoGatheringForm = () => {
    const dispatch=useDispatch();
    const candidateInfo=useSelector(state=>state.interview.candidateInfo)

    const onFinish=(values)=>{
        dispatch(confirmCandidateInfo(values))
    }
  return (
    <div>
        <Card style={{ maxWidth: 500, margin: '50px auto' }}>
      <Title level={4}>Confirm Your Details</Title>
      <p>Please fill in any missing information before we begin.</p>
      <Form
        initialValues={candidateInfo} 
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Confirm and Proceed
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  )
}

export default InfoGatheringForm