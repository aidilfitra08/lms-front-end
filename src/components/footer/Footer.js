import React from 'react'

function Footer(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <footer className={classNames(props.sideBarTrigger ? 'pl-64': 'pl-0', ' bg-slate-300 bottom-0 h-36')}>Footer</footer>
  )
}

export default Footer