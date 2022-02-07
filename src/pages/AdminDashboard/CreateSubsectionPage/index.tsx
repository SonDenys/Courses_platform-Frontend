import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import InnerPageHeader from "../../../components/InnerPageHeader";
import { create_subsection } from "../helpers/apicalls";

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

const CreateSubsectionPage = () => {
  const { course_id, chapter_id, section_id } = useParams();
  const { t } = useTranslation();
  const [subsectionName, setSubsectionName] = useState("");
  const [description, setDescription] = useState("");

  const [result, setResult] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  console.log("course id course id course id", course_id);
  console.log("chapter_id chapter_id chapter_id", chapter_id);
  console.log("section_id section_id section_id", section_id);

  const handleSubmit = async () => {
    const response = await create_subsection({
      chapter_id,
      course_id,
      section_id,
      name: subsectionName,
      description,
    });
    console.log("response createSubsection Data = = =>", response);
    console.log("Subsection_id = = = >", JSON.stringify(response.data._id));
    setResult(true);
  };

  if (result) {
    // navigate to SubSection Page
    navigate(
      `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}`
    );
  } else {
    console.log("");
  }

  return (
    <>
      <InnerPageHeader title={t("Create Subsection")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Subsection Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={(event) => setSubsectionName(event.target.value)}
            value={subsectionName}
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

export default CreateSubsectionPage;
