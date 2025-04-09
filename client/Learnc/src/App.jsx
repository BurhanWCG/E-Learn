import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './page/StudentLogin';
import Signup from './page/StudentSignup';
import Home from './page/Home';

import ProtectedStudentRoute from './components/ProtectedStudentRoute';
import ProtectedTeacherRoute from './components/ProtectedTeacherRoute';
import TeacherSignup from './page/TeacherSignup';
import TeacherLogin from './page/TeacherLogin';
import CreateCourse from './page/CreateCourse';
import About from './page/About';
import Contact from './page/Contact';

import Courses from './page/Courses';
import CourseDetails from './page/CourseDetails';
import PaymentGateway from './page/PaymentGateway';
import SearchResult from './page/SearchResult';
import StudentProfile from './page/StudentProfile';
import TeacherProfile from './page/TeacherProfile';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element = {<Navbar><Home/></Navbar>}/>
      <Route path="/contact" element = {<Navbar><Contact/></Navbar>}/>
      <Route path="/about" element = {<Navbar><About/></Navbar>}/>
      <Route path="/payment/:id" element = {<ProtectedStudentRoute><Navbar><PaymentGateway/></Navbar></ProtectedStudentRoute>}/>
      <Route path="/details/:id" element = {<Navbar><CourseDetails/></Navbar>}/>
      <Route path="/courses" element = {<Navbar><Courses/></Navbar>}/>
      <Route path="/studentprofile" element = {<ProtectedStudentRoute><Navbar><StudentProfile/></Navbar></ProtectedStudentRoute>}/>
      <Route path="/teacherprofile" element = {<ProtectedTeacherRoute><Navbar><TeacherProfile/></Navbar></ProtectedTeacherRoute>}/>
      <Route path="/login" element = {<Navbar><Login/></Navbar>}/>
      <Route path="/signup" element = {<Navbar><Signup/></Navbar>}/>
      <Route path="/teacher-login" element = {<Navbar><TeacherLogin/></Navbar>}/>
      <Route path="/teacher-signup" element = {<Navbar><TeacherSignup/></Navbar>}/>
      <Route path="/createcourse" element = {<ProtectedTeacherRoute><Navbar><CreateCourse/></Navbar></ProtectedTeacherRoute>}/>
      <Route path="/searchresults" element = {<Navbar><SearchResult/></Navbar>}/>
       

      
    </Routes>
   </Router>
  )
}

export default App
