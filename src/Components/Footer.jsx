import React from 'react'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (
    <div className="text-center py-10 mt-10 border-t dark:border-gray-700 border-gray-200 mt-auto">
      <h1>2024 Anvesana, Inc.</h1>
    </div>
  )
}

export default Footer
