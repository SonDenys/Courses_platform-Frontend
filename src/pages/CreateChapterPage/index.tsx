import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { create_chapter } from "../AdminDashboard/helpers/apicalls";
import {
  chapter_idState,
  course_idState,
} from "../../_GlobalStates/globalState/index";
import InnerPageHeader from "../../components/InnerPageHeader";

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

const CreateChapterPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const { t } = useTranslation();
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [chapter_id, setChapter_id] = useRecoilState(chapter_idState);
  const [course_id, setCourse_id] = useRecoilState(course_idState);
  const [result, setResult] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await create_chapter({
      course_id,
      name: chapterName,
      description,
    });
    console.log("response createChapter Data = = =>", response);
    console.log("chapter_id = = = >", JSON.stringify(response.data._id));
    setChapter_id(response.data._id);
    setResult(true);
  };

  if (result) {
    navigate("/admin/createcourse/createchapter/createsection");
  } else {
    console.log("");
  }

  return (
    <>
      <InnerPageHeader title={t("Create chapter")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Chapter Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={(event) => setChapterName(event.target.value)}
            value={chapterName}
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

export default CreateChapterPage;
