import { Button, Space, DatePicker } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

export default function EditActiveCoursePage(props: any) {
  const [data, setData] = useState();
  const { id, course_id, section_id, subsection_id } = useParams();

  const { RangePicker } = DatePicker;

  const handleChange = (value: any) => {
    setData(value);
  };

  useEffect((): any => {
    // setData()
  }, []);

  const handleSave = async () => {
    console.log("Save");

    // save data
  };

  const handleCancel = () => {
    console.log("Cancel");
    // save cancel
  };

  const handlePreview = () => {
    console.log("Preview");
    // save cancel
  };

  const extra = [
    <Button onClick={handlePreview}>Preview</Button>,
    <Space direction="horizontal"> </Space>,
    <Button onClick={handleCancel}>Cancel</Button>,
    <Button onClick={handleSave}>Save</Button>,
  ];

  return (
    <>
      <InnerPageHeader goBack extra={extra} />
      <Layout>
        <Content
          style={{ height: "900px" }}
          className="m-auto border-2 py-10 w-3/4"
        >
          <h1>Edit Active Courses </h1>
          <div className="flex mt-10">
            <div>
              <p>Selected Course</p>
              <p>Start and End Date</p>
            </div>
            <div className="ml-10 border-l-2 pl-10">
              <p>Name of the course</p>
              <Space direction="vertical" size={12}>
                <RangePicker showTime />
              </Space>
              ,
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
