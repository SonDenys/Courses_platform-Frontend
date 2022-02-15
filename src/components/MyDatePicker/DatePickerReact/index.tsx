import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";
import moment from "moment";

const MyReact_DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log("START DATE = = =", startDate);
  console.log("END DATE = = =", endDate);

  return (
    <div className="flex">
      <DatePicker
        className="border-2 cursor-pointer rounded-md h-10"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <div className="text-gray-300 border-l-2 h-10"></div>
      <DatePicker
        className="border-2 cursor-pointer rounded-md h-10"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
};
export default MyReact_DatePicker;
