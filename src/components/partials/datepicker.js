/* import React, { useState } from 'react';
import RegisterClosing from '../register';
import { getMyObjectFromFirestore } from '../../config/firestore';

function Datepicker() {
  // Generate an array of dates (adjust as needed)
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 30);
  const dates = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  // State to keep track of the selected date
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [data, setData] = useState([]);



  return (
    <div>
      <div class="statusbar-overlay"></div>
      <div className="datepicker d-flex flex-row overflow-auto">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date px-2 py-1 my-2 border border border-dark ${date.toLocaleDateString() == selectedDate.toLocaleDateString() ? 'selected' : ''}`}
            onClick={() => setSelectedDate(date)}
          >
            {date.toLocaleDateString()}
          </div>
        ))}
      </div>
      <div>
        Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}

      </div>

    </div>
  );
}

export default Datepicker;
 */