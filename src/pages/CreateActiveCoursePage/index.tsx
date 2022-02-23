import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../components/InnerPageHeader";
import CourseSelect from "../../components/CourseSelect";
import DatePickerAntDesign from "../../components/MyDatePicker/DatePickerAntDesign";

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
  //   const { course_id, organization_id } = useParams();

  const onFinish = (values) => {
    console.log(values);
  };

  //   const handleSubmit = async () => {
  //     setUserId(await getUserId());
  //     console.log("uerId = ==", userId);
  //     const response = await add_user_to_course({

  //     });
  //     console.log("response createChapter Data = = =>", response);
  //     console.log("chapter_id = = = >", JSON.stringify(response.data._id));
  //     setResult(true);
  //   };

  //   if (result) {
  //     // navigate to Student List Page
  //     navigate(
  //       `/admin/students/students_organizations/students_list/${course_id}/${organization_id}`
  //     );
  //   } else {
  //     console.log("");
  //   }

  return (
    <div>
      <InnerPageHeader title={t("Add Active course")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="flex flex-col items-center pt-10">
          <div className="">
            <div>
              <CourseSelect key={"header_000"} />
            </div>
            <div className="mt-6 flex">
              <p className="pr-5">Select Date</p>
              <DatePickerAntDesign />
            </div>
          </div>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              className="m-6"
              type="primary"
              // htmlType="submit"
              // onClick={() => {
              //   handleSubmit();
              // }}
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateStudentPage;
