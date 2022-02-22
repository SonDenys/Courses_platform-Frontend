import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
// import { course_idState } from "../../../_GlobalStates/globalState";
import { data } from "../../UserDashboard/data/index";
import { useNavigate, useParams } from "react-router-dom";
import { useMyToast } from "../../../_GlobalStates/hooks";
import { update_course } from "../helpers/apicalls";

export interface EditCoursePageProps {}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
    name: "${label} is not a valid name!",
    category: "${label} is not a valid category!",
    description: "${label} is not a valid description!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const EditCoursePage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const { t } = useTranslation();
  const [newCourseName, setNewCourseName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [result, setResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useMyToast();
  const { course_id } = useParams();

  const handleSubmit = async () => {
    const response = await update_course({
      _id: course_id,
      name: newCourseName,
      category: newCategory,
      description: newDescription,
    });
    console.log("response editCourse Data = = =>", response);
    console.log("course_id = = = >", JSON.stringify(response.data._id));

    setResult(true);

    if (response) {
      navigate("/admin/courses", { replace: true });
    } else {
      console.log("Edit Course Failed");
      setErrorMessage("Edit Course Failed");
      toast.error("Edit Course Failed");
    }
  };

  const extra = [
    // <Button
    //   key={`header_001`}
    //   type="ghost"
    //   size="middle"
    //   // onClick={props.onRefreshClick as any}
    // >
    //   {t("preview")}
    // </Button>,
    <Button
      key={`header_002`}
      type="ghost"
      size="middle"
      // navigate to Create SubSection Page
      onClick={() => {
        handleSubmit();
      }}
      //   onClick={handleClickCreate}
    >
      {t("save")}
    </Button>,
  ];

  return (
    <div>
      <InnerPageHeader title={t("Edit course")} extra={extra} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="pr-52 pt-12">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setNewCourseName(event.target.value)}
              value={newCourseName}
            />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Input
              onChange={(event) => setNewCategory(event.target.value)}
              value={newCategory}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              onChange={(event) => setNewDescription(event.target.value)}
              value={newDescription}
            />
          </Form.Item>
        </div>

        <p>{errorMessage}</p>

        {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default EditCoursePage;
