import { Layout, Tabs } from 'antd'
import IntervieweePage from './Pages/IntervieweePage'
import InterviewerPage from './Pages/InterviewerPage'
import 'antd/dist/reset.css'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'


const {Content,Header} = Layout

const AppTabs=()=>{
  const location = useLocation()
  const activeKey=location.pathname

  const items =[
    {
      key:'/',
      label:<Link to="/">Interviewee</Link>
    },
    {
      key:'/interviewer',
      label:<Link to="/interviewer">Interviewer</Link>
    }
  ]

  return <Tabs accessKey={activeKey} items={items} />
}


function App() {

  return (
    <BrowserRouter>

      <Layout style={{minHeight:"100vh"}}>

        <Header style={{ backgroundColor: '#fff', padding: '0 24px' }}>
          <div style={{ float: 'left', fontSize: '20px', fontWeight: 'bold' }}>
                Crisp AI Interviewer
            </div>
        </Header>

        <Content style={{ padding: '24px' }}>

          <AppTabs/>
          <div style={{background: '#fff', padding: 24, minHeight: 280, marginTop: 16 }}>

            <Routes>

              <Route path="/" element={<IntervieweePage />} />
              <Route path="/interviewer" element={<InterviewerPage />} />

            </Routes>

          </div>

        </Content>

      </Layout>

    </BrowserRouter>
  )
}

export default App
