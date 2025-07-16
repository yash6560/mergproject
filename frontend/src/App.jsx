import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import ChatPage from './pages/ChatPage';
import FileUpload from './pages/FileUpload';

function App() {
  const { fetchAuthUser, authUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async() => {
      await fetchAuthUser();
    }
    fetchUser();
    
  }, [])
  

  return (
    <div className='h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
          <Route path="/chat" element={authUser ? <Layout><ChatPage/></Layout> : <LoginPage/>}/>
          <Route path="/file-upload" element={authUser ? <Layout><FileUpload/></Layout> : <LoginPage/>}/>
        </Routes>
        
        <Toaster />
      </Router>
    </div>
  )
}

export default App
