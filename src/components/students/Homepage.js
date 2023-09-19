import React from 'react'
import Sidenav from '../navbar/Sidenav'
import Footer from '../footer/Footer'
import CourseCard from './CourseCard'

function Homepage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const testingMap = [1,2,3,4,5]
  return (
    <>
      {/* <Sidenav/> */}
      <div className={classNames(props.sideBarTrigger ? 'pl-0': 'pl-64', 'pt-16 grid grid-cols-12 bg-blue-400')} >
        <div className='col-span-9 bg-slate-200 grid grid-cols-3'>

          {testingMap.map((number) => (
            <div className='col-span-1'>
            <CourseCard />
            </div>
          ))}
        </div>
        <div className='col-span-3 bg-blue-500'>
          right
        </div>

      </div>
      <Footer sideBarTrigger={props.sideBarTrigger} />
    </>
  )
}

export default Homepage