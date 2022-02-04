import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { create_course } from "../../../helpers/apicalls";

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

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={() => {
              create_course({
                name: courseName,
                category,
                description,
              });
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
