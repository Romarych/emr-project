import React, { useEffect, useState } from 'react';

const DateNow = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const second = date.toLocaleString("en-US", { second: 'numeric' });
 
    setTimeout(() => {
      setDate(new Date());
    }, (60 - +second) * 1000);
  }, [date]);
  

  const dateNow = date.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
  const timeNow = date.toLocaleString("en-US", { hour: 'numeric', minute: 'numeric' });

  return (
    <div className='font-light text-base leading-5 text-black-1'>
      <span>Today:</span>
      <span className='mx-3'>{timeNow}</span>
      <span className='pl-3 border-l border-gray-2'>{dateNow}</span>
    </div>
  );
};

export default DateNow;