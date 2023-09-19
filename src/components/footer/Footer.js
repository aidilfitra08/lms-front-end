import React from 'react'

function Footer(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className={classNames(props.sideBarTrigger ? 'pl-0': 'pl-64', ' bg-slate-400 bottom-0 h-36')}>Footer</div>
  )
}

export default Footer