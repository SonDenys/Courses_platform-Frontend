import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

import { columns, table_data } from "../data";
import { delete_subsection, get_subsections } from "../helpers/apicalls";
import { showDeleteSubsectionConfirm } from "../../../components/ui/helpers/index";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";

export default function SubSectionPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { course_id, chapter_id, section_id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await get_subsections({
        section_id: section_id,
        course_id: course_id,
        chapter_id: chapter_id,
      });
      setData(response.data);
      try {
      } catch (error) {
        console.log(error);
      }
    })();
  }, [course_id, chapter_id, section_id]);

  const handleDelete = async ({
    _id: subsection_id,
    course_id,
    chapter_id,
    section_id,
  }) => {
    try {
      const response = await delete_subsection({
        _id: subsection_id,
        course_id: course_id,
        chapter_id: chapter_id,
        section_id: section_id,
      });

      if (response) {
        const newData = data.filter((x: any) => x._id !== subsection_id);
        setData(newData);
      }
      if (!response) {
        console.log("Delete subsection failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_subsection api call");
    }
  };

  const columns = [
    {
      title: "Subsection name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => {
        const subsection_id = record._id;
        return (
          <span

          // onClick={() =>
          //   navigate(
          //     `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}/${subsection_id}`
          //   )
          // }
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created_at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated_at",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Created_by",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Updated_by",
      dataIndex: "updated_by",
      key: "updated_by",
    },
    {
      title: t("actions"),
      key: "actions",
      // dataIndex: "actions",
      render: (text: any, record: any) => {
        const subsection_id = record._id;

        return (
          <>
            <Space direction="horizontal">
              <Button
                onClick={() =>
                  navigate(
                    `/admin/courses/chapters/sections/subsections/edit/${course_id}/${chapter_id}/${section_id}/${subsection_id}`
                  )
                }
              >
                {t("edit")}
              </Button>

              <ConfirmButton
                buttonText="delete"
                title="delete"
                onConfirm={() =>
                  handleDelete({
                    _id: subsection_id,
                    course_id,
                    chapter_id,
                    section_id,
                  })
                }
              />

              {/* <Button
                onClick={() => {
                  showDeleteSubsectionConfirm({
                    title: "Delete Subsection?",
                    content: "Are you sure to delete the Subsection?",
                    course_id: course_id,
                    chapter_id: chapter_id,
                    section_id: section_id,
                    subsection_id: subsection_id,
                  });
                }}
              >
                {t("delete")}
              </Button> */}
            </Space>
          </>
        );
      },
    },
  ];

  const extra = [
    <OrganizationSelect
      key={"header_000"}
      onChange={props.onChangeOrganization}
      readOnly={props.organizationReadOnly}
    />,
    <Button
      key={`header_001`}
      type="ghost"
      size="middle"
      // onClick={props.onRefreshClick as any}
    >
      {t("refresh")}
    </Button>,
    <Button
      key={`header_002`}
      type="ghost"
      size="middle"
      // navigate to Create SubSection Page
      onClick={() =>
        navigate(
          `/admin/courses/chapters/sections/subsections/createsubsection/${course_id}/${chapter_id}/${section_id}`
        )
      }
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Subsections")}
        goBack
        extra={extra}
        // onCreateClick={() =>
        //   navigate(
        //     // navigate to Create SubSection Page
        //     `/admin/courses/chapters/sections/subsections/createsubsection/${course_id}/${chapter_id}/${section_id}`
        //   )
        // }
      />
      <Table
        className="ml-2 mr-2  !rounded-lg !border-gray-500"
        columns={columns}
        dataSource={data}
      />
      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
