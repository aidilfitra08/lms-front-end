import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendarDays, faChartLine, faEnvelope, faHouseChimney } from '@fortawesome/free-solid-svg-icons'

function Sidenav(props) {

  function close_button() {
    
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Dashboard', href: '/student', current: true },
    { name: 'Login', href: '/login', current: false },
    { name: 'Conference', href: '/student/conference', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  return (
    <aside className={classNames(props.sideBarTrigger ? ' hidden' : ' bg-red-500', 'pt-16 w-64 h-screen fixed inset-y-0 flex flex-col')}>
      <a href='student/homepage' className='w-full bg-yellow-300 block py-4 hover:bg-yellow-100'><FontAwesomeIcon icon={faHouseChimney} size='lg' className='px-3'/> Homepage</a>
      <a href='student/homepage' className='w-full bg-yellow-300 block py-4 hover:bg-yellow-100'><FontAwesomeIcon icon={faBook} size='lg' className='px-3'/> Courses</a>
      <a href='student/homepage' className='w-full bg-yellow-300 block py-4 hover:bg-yellow-100'><FontAwesomeIcon icon={faCalendarDays} size='lg' className='px-3'/> Calendar</a>
      <a href='student/homepage' className='w-full bg-yellow-300 block py-4 hover:bg-yellow-100'><FontAwesomeIcon icon={faChartLine} size='lg' className='px-3'/> Activities</a>
      <a href='student/homepage' className='w-full bg-yellow-300 block py-4 hover:bg-yellow-100'><FontAwesomeIcon icon={faEnvelope} size='lg' className='px-3'/> Messages</a>
    </aside>
  )
}

export default Sidenav