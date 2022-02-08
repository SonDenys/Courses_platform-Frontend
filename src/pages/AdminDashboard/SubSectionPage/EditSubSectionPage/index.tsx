import { Button, Form, Input, Space } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../../components/InnerPageHeader";
import { useTranslation } from "react-i18next";
import { useMyToast } from "../../../../_GlobalStates/hooks";
import { get_subsections, update_subsection } from "../../helpers/apicalls";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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

export default function EditSubSectionPage(props: any) {
  const [data, setData] = useState();
  const { t } = useTranslation();
  const [newSubsectionName, setNewSubsectionName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [result, setResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useMyToast();
  const { course_id, chapter_id, section_id, subsection_id } = useParams();

  const onFinish = (values) => {
    console.log(values);
  };

  const handleChange = (value: any) => {
    setData(value);
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await get_subsections({
  //       section_id: section_id,
  //       course_id: course_id,
  //       chapter_id: chapter_id,
  //     });
  //     setData(response.data);
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [course_id, chapter_id, section_id]);

  const handleCancel = () => {
    console.log("Cancel");
    // save cancel
  };

  const handlePreview = () => {
    console.log("Preview");
    // save cancel
  };

  const handleSave = async () => {
    const response = await update_subsection({
      _id: subsection_id,
      course_id: course_id,
      chapter_id: chapter_id,
      section_id: section_id,
      name: newSubsectionName,
      description: newDescription,
      html_data: data,
    });
    console.log("response editSection Data = = =>", response);
    console.log("section_id = = = >", JSON.stringify(response.data._id));

    setResult(true);

    if (response) {
      // go to the Subsection Page
      navigate(
        `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}`,
        {
          replace: true,
        }
      );
    } else {
      console.log("Edit Subsection Failed");
      setErrorMessage("Edit Subsection Failed");
      toast.error("Edit Subsection Failed");
    }
  };

  const extra = [
    <Button onClick={handlePreview}>Preview</Button>,
    <Space direction="horizontal"> </Space>,
    <Button onClick={handleCancel}>Cancel</Button>,
    <Button onClick={handleSave}>Save</Button>,
  ];

  return (
    <>
      <InnerPageHeader title={t("Edit Subsection")} goBack extra={extra} />
      <Layout>
        <Content style={{ height: "900px" }}>
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
                onChange={(event) => setNewSubsectionName(event.target.value)}
                value={newSubsectionName}
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
                  handleSave();
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <ReactQuill
            defaultValue={data}
            className="ml-2 mr-2 h-80 rounded-sm"
            onChange={handleChange}
            value={data}
          />
        </Content>
      </Layout>
    </>
  );
}
