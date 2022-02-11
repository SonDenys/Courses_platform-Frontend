import { Form, Input, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { get_one_subsection, update_subsection } from "../../helpers/apicalls";
import OrganizationSelect from "../../../../components/OrganizationSelect";
import InnerPageHeader from "../../../../components/InnerPageHeader";
import EditorToolbar, {
  formats,
  modules,
} from "../../../../components/EditorToolbar";
import MyModal from "../../../../components/ui/MyModal";

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

const EditSubsectionPageTest = () => {
  const { course_id, chapter_id, section_id, subsection_id } = useParams();
  const { t } = useTranslation();
  const [subsectionName, setSubsectionName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [defaultHtmlData, setDefaultHtmlData] = useState("");
  const [defaultDescription, setDefaultDescription] = useState("");
  const [defaultSubsectionName, setDefaultSubsectionName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [result, setResult] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  const handleChange = (value: any) => {
    setData(value);
    console.log(value);
  };

  const handleCancel = () => {
    console.log("Cancel");
    // save cancel
  };

  const handlePreview = () => {
    onclick = () => {
      setOpenModal(true);
    };
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(false);

        const response = await get_one_subsection({
          _id: subsection_id,
          section_id: section_id,
          course_id: course_id,
          chapter_id: chapter_id,
        });

        if (response && response.data) {
          console.log("default data = = = =", JSON.stringify(response.data));
          const data = response.data[0];

          setDefaultHtmlData(data.html_data);
          setDefaultDescription(data.description);
          setDefaultSubsectionName(data.name);

          console.log("string_html_data = = =", data._html_data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [course_id, chapter_id, section_id, subsection_id]);

  console.log("course id course id course id", course_id);
  console.log("chapter_id chapter_id chapter_id", chapter_id);
  console.log("section_id section_id section_id", section_id);

  const handleSubmit = async () => {
    if (!subsectionName || !description || !data) {
      // setResult(false);
      setErrorMessage(
        "One field at least is missing or you need to rewrite the subsection name and the description"
      );
    } else {
      const response = await update_subsection({
        _id: subsection_id,
        chapter_id,
        course_id,
        section_id,
        name: subsectionName,
        description: description,
        html_data: data,
      });
      console.log("response createSubsection Data = = =>", response);
      console.log("Subsection_id = = = >", JSON.stringify(response.data._id));

      if (response) {
        navigate(
          `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}`
        );
      }

      // setResult(true);
    }
  };

  // if (result) {
  //   // navigate to SubSection Page
  // navigate(
  //   `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}`
  // );
  // } else {
  //   console.log("");
  // }

  const extra = [
    <OrganizationSelect
      key={"header_000"}
      // onChange={props.onChangeOrganization}
      // readOnly={props.organizationReadOnly}
    />,
    <Button
      key={`header_001`}
      type="ghost"
      size="middle"
      onClick={handlePreview}
      // onClick={props.onRefreshClick as any}
    >
      {t("preview")}
    </Button>,

    <Button
      key={`header_002`}
      type="ghost"
      size="middle"
      // onClick={props.onCreateClick as any}
      //   onClick={handleClickCreate}
      onClick={() => {
        handleSubmit();
      }}
    >
      {t("save")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Edit Subsection")}
        goBack={true}
        extra={extra}
      />

      {openModal ? (
        <MyModal
          text1={`${defaultSubsectionName}`}
          text2={`${defaultDescription}`}
        />
      ) : (
        ""
      )}

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
          {defaultSubsectionName && (
            <Input
              onChange={(event) => setSubsectionName(event.target.value)}
              value={subsectionName}
              defaultValue={defaultSubsectionName}
            />
          )}
        </Form.Item>

        <Form.Item name="description" label="Description">
          {defaultDescription && (
            <Input.TextArea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              defaultValue={defaultDescription}
            />
          )}
          {/* {!defaultDescription && (
            <Input.TextArea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          )} */}
        </Form.Item>

        <p className="text-red-600 font-bold"> {errorMessage}</p>

        {defaultHtmlData}

        <EditorToolbar />
        <ReactQuill
          defaultValue="jkqdkqzkdz"
          className="ml-2 mr-2 h-96 w-full rounded-lg"
          onChange={handleChange}
          value={data}
          theme="snow"
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />

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

export default EditSubsectionPageTest;
