import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

import { columns, table_data } from "../data";
import { get_subsections } from "../helpers/apicalls";

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

  const columns = [
    {
      title: "Subsection name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => {
        const subsection_id = record._id;
        return (
          <span
            className="cursor-pointer"
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
                  // navigate to Create Section Page
                  navigate(
                    `/admin/courses/chapters/sections/subsections/edit/${course_id}/${chapter_id}/${section_id}/${subsection_id}`
                  )
                }
              >
                {t("edit")}
              </Button>
              <Button onClick={() => console.log("delete subsection")}>
                {t("delete")}
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Subsections")}
        goBack
        onCreateClick={() =>
          navigate(
            `/admin/courses/chapters/sections/subsections/createsubsection/${course_id}/${chapter_id}/${section_id}`
          )
        }
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
