import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
// import { course_idState } from "../../../_GlobalStates/globalState";
import { data } from "../../UserDashboard/data/index";
import { useNavigate, useParams } from "react-router-dom";
import { useMyToast } from "../../../_GlobalStates/hooks";
import { update_chapter } from "../helpers/apicalls";

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

const EditChapterPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const { t } = useTranslation();
  const [newChapterName, setNewChapterName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [result, setResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useMyToast();
  const { course_id, chapter_id } = useParams();

  const handleSubmit = async () => {
    const response = await update_chapter({
      _id: chapter_id,
      course_id: course_id,
      name: newChapterName,
      description: newDescription,
    });
    console.log("response editChapter Data = = =>", response);
    console.log("chapter_id = = = >", JSON.stringify(response.data._id));

    setResult(true);

    if (response) {
      // go to the Chapter Page
      navigate(`/admin/courses/chapters/${course_id}`, { replace: true });
    } else {
      console.log("Edit Chapter Failed");
      setErrorMessage("Edit Chapter Failed");
      toast.error("Edit Chapter Failed");
    }
  };

  return (
    <>
      <InnerPageHeader title={t("Edit chapter")} goBack={true} />
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
            onChange={(event) => setNewChapterName(event.target.value)}
            value={newChapterName}
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

export default EditChapterPage;
