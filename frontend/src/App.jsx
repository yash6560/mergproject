import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';


function App() {

  return (
    <div className='h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
