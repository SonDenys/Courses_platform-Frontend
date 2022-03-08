import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
// import { course_idState } from "../../../_GlobalStates/globalState";
import { data } from "../../UserDashboard/data/index";
import { useNavigate, useParams } from "react-router-dom";
import { useMyToast } from "../../../_GlobalStates/hooks";
import { update_section } from "../helpers/apicalls";

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

const EditSectionPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const { t } = useTranslation();
  const [newSectionName, setNewSectionName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [result, setResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useMyToast();
  const { course_name, course_id, chapter_name, chapter_id, section_id } =
    useParams();

  const handleSubmit = async () => {
    const response = await update_section({
      _id: section_id,
      course_id: course_id,
      chapter_id: chapter_id,
      name: newSectionName,
      description: newDescription,
    });
    console.log("response editSection Data = = =>", response);
    console.log("section_id = = = >", JSON.stringify(response.data._id));

    setResult(true);

    if (response) {
      // go to the Section Page
      navigate(
        `/admin/courses/${course_name}/${course_id}/chapters/${chapter_name}/${chapter_id}/sections`,
        {
          replace: true,
        }
      );
    } else {
      console.log("Edit Section Failed");
      setErrorMessage("Edit Section Failed");
      toast.error("Edit Section Failed");
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
    <>
      <InnerPageHeader title={t("Edit Section")} extra={extra} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="pr-52 pt-12">
          <Form.Item
            name="name"
            label="Section Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setNewSectionName(event.target.value)}
              value={newSectionName}
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
    </>
  );
};

export default EditSectionPage;
