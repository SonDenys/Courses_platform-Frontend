import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import MyInput from "../../../components/ui/MyInput";

const AdminCreation = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  return (
    <>
      <div>
        <h1>Admin Creation {id}</h1>
        <p>This is the Admin Creation {id}</p>
      </div>
      <div>
        <h3>Title Course</h3>
        {/* <MyInput defaultValue="Title Course....." label="Title Course" /> */}
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </>
  );
};

export default AdminCreation;
