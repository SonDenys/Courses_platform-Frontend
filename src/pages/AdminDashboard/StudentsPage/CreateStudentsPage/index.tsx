import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { add_user_to_course } from "../../helpers/apicalls";
import { getUserId } from "../../../../Auth";
import InnerPageHeader from "../../../../components/InnerPageHeader";

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

const CreateStudentPage = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const { course_id, organization_id } = useParams();

  const onFinish = (values) => {
    console.log(values);
  };

  const handleSubmit = async () => {
    setUserId(await getUserId());
    console.log("uerId = ==", userId);
    const response = await add_user_to_course({
      course_id,
      user_id: userId,
      organization_id,
      start_time: "2022-02-14T14:28:34.462Z",
      end_time: "2022-03-12T14:28:34.462Z",
      role,
    });
    console.log("response createChapter Data = = =>", response);
    console.log("chapter_id = = = >", JSON.stringify(response.data._id));
    setResult(true);
  };

  if (result) {
    // navigate to Student List Page
    navigate(
      `/admin/students/students_organizations/students_list/${course_id}/${organization_id}`
    );
  } else {
    console.log("");
  }

  return (
    <>
      <InnerPageHeader title={t("Add Student")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="pr-52 pt-12">
          <Form.Item
            name="name"
            label="Student Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setStudentName(event.target.value)}
              value={studentName}
            />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Input.TextArea
              onChange={(event) => setRole(event.target.value)}
              value={role}
            />
          </Form.Item>
        </div>

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

export default CreateStudentPage;
