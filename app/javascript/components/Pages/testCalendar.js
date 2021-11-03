import React, { useState } from 'react';
import Calendar from 'react-calendar';

const datesToAddClassTo = ['2021-11-08', '2021-12-08', '2021-11-18',];

const NewCalendar = () =>
{

  const [value, setValue] = useState(new Date());

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        return 'myClassName';
      }
    }
  }
  
  function onChange(nextValue) {
    setValue(nextValue);
  }
    
  
  return (
    <Calendar
      onChange={onChange}
      value={date}
      tileClassName={tileClassName}
    />
  );
}

export default NewCalendar