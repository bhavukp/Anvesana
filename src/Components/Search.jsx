import React, {useEffect, useState} from 'react'
import { useDebounce } from 'use-debounce'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Links from './Links'
import { useResultContext } from '../Contexts/ResultContextProvider'

export default function Search() {

  const [text, setText] = useState('')
  const {SearchTerm,setSearchTerm} = useResultContext()
  const [debouncedValue] = useDebounce(text, 500);
  const location = useLocation();

  useEffect(()=>{
    if(debouncedValue){
      setSearchTerm(debouncedValue)
    }
  },[debouncedValue])
  useEffect( () => {
    if (location.pathname === "/news") {
      setText('');
      setSearchTerm('')
    }
  },[location])

  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
      <input
        value={text}
        type='text'
        className='sm:96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        placeholder='Search Anvesana or Type URL'
        onChange={(e)=>{
          setText(e.target.value);
        }}
      />
      {text && (
        <button type='button' className='absolute top-1.5 right-4 text-2xl text-gray-500' onClick={()=>{setText(''); setSearchTerm('')}}>X</button>
      )}
      <Links/>
    </div>
  )
}
