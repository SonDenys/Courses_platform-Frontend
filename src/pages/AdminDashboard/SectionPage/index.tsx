import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmButton from "../../../components/ConfirmButton";
import InnerPageHeader from "../../../components/InnerPageHeader";
import OrganizationSelect from "../../../components/OrganizationSelect";
import { showDeleteSectionConfirm } from "../../../components/ui/helpers";

import { columns, table_data } from "../data";
import { delete_section, get_sections } from "../helpers/apicalls";

export default function SectionPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { course_id, chapter_id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await get_sections({
        course_id: course_id,
        chapter_id: chapter_id,
      });
      setData(response.data);
      try {
      } catch (error) {
        console.log(error);
      }
    })();
  }, [course_id, chapter_id]);

  const handleDelete = async ({ _id: section_id, course_id, chapter_id }) => {
    try {
      const response = await delete_section({
        _id: section_id,
        course_id: course_id,
        chapter_id: chapter_id,
      });

      if (response) {
        const newData = data.filter((x: any) => x._id !== section_id);
        setData(newData);
      }
      if (!response) {
        console.log("Delete section failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_section api call");
    }
  };

  const columns = [
    {
      title: "Section name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => {
        const section_id = record._id;
        return (
          <span
            className="cursor-pointer"
            onClick={() =>
              // Go to the Subsections page
              navigate(
                `/admin/courses/chapters/sections/subsections/${course_id}/${chapter_id}/${section_id}`
              )
            }
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
        const section_id = record._id;
        return (
          <>
            <Space direction="horizontal">
              <Button
                onClick={() =>
                  // navigate to Edit Section Page
                  navigate(
                    `/admin/courses/chapters/sections/sectionedit/${course_id}/${chapter_id}/${section_id}`
                  )
                }
              >
                {t("edit")}
              </Button>

              <ConfirmButton
                buttonText="delete"
                title="Are you sure to delete this section?"
                onConfirm={() =>
                  handleDelete({ _id: section_id, course_id, chapter_id })
                }
              />

              {/* <Button
                onClick={() => {
                  showDeleteSectionConfirm({
                    title: "Delete Section?",
                    content: "Are you sure to delete the section?",
                    course_id: course_id,
                    chapter_id: chapter_id,
                    section_id: section_id,
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
          `/admin/courses/chapters/sections/createsection/${course_id}/${chapter_id}`
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
        title={t("Sections")}
        goBack
        extra={extra}
        // onCreateClick={() =>
        //   navigate(
        //     `/admin/courses/chapters/sections/createsection/${course_id}/${chapter_id}`
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
