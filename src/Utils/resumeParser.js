import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.100/pdf.worker.min.js`;

const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
const phoneRegex = /(?:(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?)/;
const nameRegex = /([A-Z][a-z]+(?: [A-Z][a-z]+)*)/;

export const parseResume = async (file) => {
  let text = '';
  try {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        text += strings.join(' ') + '\n';
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    } else {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }

    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    const nameMatch = text.match(nameRegex);

    return {
      name: nameMatch ? nameMatch[0] : '',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse the resume file. It might be corrupted or in an unsupported format.');
  }
};
