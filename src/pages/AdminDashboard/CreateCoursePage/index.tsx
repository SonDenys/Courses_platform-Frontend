import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { course_idState } from "../../../_GlobalStates/globalState";
import { create_course } from "../helpers/apicalls";
import { data } from "../../UserDashboard/data/index";
import { useNavigate, useParams } from "react-router-dom";

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

const CreateCoursePage = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const { t } = useTranslation();
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  // const [course_id, setCourse_id] = useRecoilState(course_idState);
  const [result, setResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { course_id } = useParams();

  const handleSubmit = async () => {
    const response = await create_course({
      name: courseName,
      category,
      description,
    });
    console.log("response createCourse Data = = =>", response);
    console.log("course_id = = = >", JSON.stringify(response.data._id));
    // setCourse_id(response.data._id);
    setResult(true);

    if (result) {
      navigate("/admin/createcourse/createchapter");
    } else {
      console.log("Create Course Failed");
      setErrorMessage("Create Course Failed");
    }
  };

  return (
    <>
      <InnerPageHeader title={t("Create course")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
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
            onChange={(event) => setCourseName(event.target.value)}
            value={courseName}
          />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </Form.Item>

        <p>{errorMessage}</p>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCoursePage;
