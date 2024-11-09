import React from 'react'
import { useSelector } from 'react-redux'
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'

const Profile = () => {
  const { isStudentAuthenticated, isTeacherAuthenticated } = useSelector(state => state.auth);


  return (
    <div>
    {isStudentAuthenticated ? <StudentProfile /> : isTeacherAuthenticated ? <TeacherProfile /> : <p>No profile available</p>}
  </div>
  )
}

export default Profile
