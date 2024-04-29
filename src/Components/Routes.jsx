import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Results from './Results'

const Router = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route exact path="/" element={<Navigate to="/search"/>}/>
        {['/search','/images','/news','/videos'].map((val,index)=>( <Route key={index} path={val} element={<Results/>}/> ) )}
      </Routes>
    </div>
  )
}

export default Router
