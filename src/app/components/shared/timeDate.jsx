import React from 'react'
import { useState, useEffect } from 'react';


const TimeDate = () => {
    //Date and Time
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    setDateTime(formattedDateTime);
  }, []);

  return (
    <h2 className='text-blue-800'> Date and Time: {dateTime}</h2>
    )
}

export default TimeDate