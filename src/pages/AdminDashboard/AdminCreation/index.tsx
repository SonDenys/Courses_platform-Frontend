import { useState } from "react";
import { useParams } from "react-router-dom";
import MyInput from "../../../components/ui/MyInput";
// import MyReactQuill from "../../../components/ui/MyReactQuill/index"

const AdminCreation = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  return (
    <div>
      <div>
        <h1>Admin Creation {id}</h1>
        <p>This is the Admin Creation {id}</p>
      </div>
      <div>
        <h3>Title Course</h3>
        {/* <MyInput defaultValue="Title Course....." label="Title Course" /> */}
        {/* <MyReactQuill/> */}
      </div>
    </div>
  );
};

export default AdminCreation;
