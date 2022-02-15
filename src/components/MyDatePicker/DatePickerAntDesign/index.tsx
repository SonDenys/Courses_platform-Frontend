import { DatePicker, Space } from "antd";
import moment from "moment";
import { useState } from "react";
import { start } from "repl";

const { RangePicker } = DatePicker;

const MyDatePicker = () => {
  // const [date, setDate] = useState([]);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  const handleChangeDebut = (date) => {
    const startDate = date[0]();
    const endDate = date[1]();

    console.log("start date = = = =", startDate);
    console.log("end date = = =", endDate);
  };

  return (
    <>
      <Space direction="vertical" size={12}>
        <RangePicker
          onChange={(date) => handleChangeDebut(date)}
          format="YYYY-MM-DD HH:mm:ss"
          dateRender={(current) => {
            if (current.date() === 1) {
              const border = "border border-gray-300";
              const borderRadius = "rounded-xl";
              return (
                <div
                  className={`ant-picker-cell-inner ${border} ${borderRadius}`}
                >
                  {current.date()}
                </div>
              );
            }

            return (
              <div className="ant-picker-cell-inner">{current.date()}</div>
            );
          }}
        />
      </Space>
    </>
  );
};

export default MyDatePicker;
