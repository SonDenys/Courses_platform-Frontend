import { Dialog } from "@headlessui/react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { htmlData_State } from "../../../_GlobalStates/globalState";
import { get_one_subsection } from "../helpers/apicalls";

const CourseViewPage = () => {
  const { t } = useTranslation();
  const {
    course_name,
    course_id,
    chapter_name,
    chapter_id,
    section_name,
    section_id,
    subsection_name,
    subsection_id,
  } = useParams();

  const [subsectionName, setSubsectionName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [defaultDescription, setDefaultDescription] = useState("");
  const [defaultSubsectionName, setDefaultSubsectionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

          setDefaultDescription(data.description);
          setDefaultSubsectionName(data.name);

          setData(data.html_data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [course_id, chapter_id, section_id, subsection_id]);

  const extra = [
    // <OrganizationSelect
    //   key={"header_000"}
    //   // onChange={props.onChangeOrganization}
    //   // readOnly={props.organizationReadOnly}
    // />,
    // <Button
    //   key={`header_001`}
    //   type="ghost"
    //   size="middle"
    //   onClick={openPreview}
    //   // onClick={props.onRefreshClick as any}
    // >
    //   {t("preview")}
    // </Button>,
    // <Button
    //   key={`header_002`}
    //   type="ghost"
    //   size="middle"
    //   // onClick={props.onCreateClick as any}
    //   //   onClick={handleClickCreate}
    //   onClick={() => {
    //     handleSubmit();
    //   }}
    // >
    //   {t("save")}
    // </Button>,
  ];

  console.log("htlmlData :", data);

  return (
    <>
      <InnerPageHeader title={t("Course View")} goBack={true} extra={extra} />

      <div className="mt-3 sm:mt-5 p-10">
        <div className={`text-lg leading-6 font-medium `}>
          Course : {course_name}
        </div>
        <div className="mt-2">
          <p className={`text-md font-medium`}>Chapter : {chapter_name}</p>
        </div>
        <div className="mt-2">
          <p className={`text-md font-medium `}>Section : {section_name}</p>
        </div>
        <div className="mt-2">
          <p className={`text-md font-medium `}>
            Subsection : {defaultSubsectionName}
          </p>
        </div>
        <div className="mt-2">
          <p className={`text-md italic`}>Description : {defaultDescription}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
    </>
  );
};

export default CourseViewPage;
