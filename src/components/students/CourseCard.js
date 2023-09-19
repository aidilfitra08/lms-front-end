import React from 'react'
import TestCoursePhoto from '../../assets/man-photo.png' 

function CourseCard(props) {
  return (
    <div className='flex flex-col m-5'>
      <div className='thumbnail bg-orange-300 w-full'>
        <img src={TestCoursePhoto} className='' />
      </div>
      <div className='title text-3xl font-semibold'>Course Title</div>
      <div className=' text-lg font-semibold'>Instructor Name</div>
      <div className='thumbnail'>Completion</div>
    </div>
  )
}

export default CourseCard