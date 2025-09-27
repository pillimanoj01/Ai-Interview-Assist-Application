import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { parseResume } from '../Utils/resumeParser';
import { message, Spin, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { setParsedInfo } from '../Redux/interviewSlice';

const ResumeUpload = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = async (file) => {
    const isPdfOrDocx =
      file.type === 'application/pdf' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (!isPdfOrDocx) {
      message.error('You can only upload PDF or DOCX files!');
      return false; 
    }

    setLoading(true);

    try {
      const info = await parseResume(file);
      message.success(`${file.name} parsed successfully!`);
      dispatch(setParsedInfo(info));
    } catch (error) {
      console.error(error);
      message.error(error.message || 'Failed to parse the file.');
    } finally {
      setLoading(false);
    }

    return false; 
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin spinning={loading} tip="Parsing Resume...">
        <h2>Upload Your Resume to Begin</h2>
        <p>Please upload your resume in PDF or DOCX format.</p>
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false}
          accept=".pdf,.docx"
        >
          <Button type="primary" icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Spin>
    </div>
  );
};

export default ResumeUpload;
