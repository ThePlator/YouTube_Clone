import React from 'react'
import FilterBtn from '../components/FilterBtn'
import VideoList from '../components/VideoList'
import Sidenav from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

const Maincontainer = () => {
  return (
    <div className='flex  bg-gray-800 text-white'>
        <Sidenav/>
        <Outlet/>
    </div>
  )
}

export default Maincontainer