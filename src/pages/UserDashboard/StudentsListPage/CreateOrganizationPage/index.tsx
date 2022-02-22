import { Form, Input, InputNumber, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { getUserId } from "../../../../Auth";
import InnerPageHeader from "../../../../components/InnerPageHeader";
import { create_user } from "../../../AdminDashboard/helpers/apicalls";

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

const CreateOrganizationPage = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scope, setScope] = useState("");
  const [profile_url, setProfile_url] = useState("");
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { course_id, organization_id } = useParams();

  const onFinish = (values) => {
    console.log(values);
  };

  const handleSubmit = async () => {
    // setUserId(await getUserId());
    console.log("uerId = ==", userId);
    const response = await create_user({
      organization_name: organizationName,
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email: email,
      password: password,
      scopes: scope,
      profile_url,
      currency,
    });
    console.log("response create_user Data = = =>", response);
    console.log("student_id = = = >", JSON.stringify(response.data._id));
    setResult(true);

    if (!response) {
      console.log("the api call create_user has not been reached");
    } else {
      setData(response.data);
      navigate(`/user/students`);
    }
  };

  return (
    <>
      <InnerPageHeader title={t("Create an Organization")} goBack={true} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="pr-52 pt-12">
          <Form.Item
            name="organization_name"
            label="Organization Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setOrganizationName(event.target.value)}
              value={organizationName}
            />
          </Form.Item>

          <Form.Item
            name="firstname"
            label="Firstname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Lastname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Input
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </Form.Item>

          <Form.Item
            name="scope"
            label="Scope"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Input
              onChange={(event) => setScope(event.target.value)}
              value={scope}
            />
          </Form.Item>

          {/* <Form.Item name="role" label="Role">
            <Input.TextArea
              onChange={(event) => setRole(event.target.value)}
              value={role}
            />
          </Form.Item> */}
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

export default CreateOrganizationPage;
