import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";
import { showDeleteChapterConfirm } from "../../../components/ui/helpers";
import konsole from "../../../konsole";

import { columns, table_data } from "../data";
import { get_chapters } from "../helpers/apicalls";

export default function ChapterPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { course_id } = useParams();

  konsole.log("course_id course_id  course_id  course_id  course_id ");
  konsole.log("course_id course_id  course_id  course_id  course_id ");
  konsole.log("course_id = = = = = == = = =>", course_id);
  konsole.log("course_id course_id  course_id  course_id  course_id ");
  konsole.log("course_id course_id  course_id  course_id  course_id ");

  useEffect(() => {
    (async () => {
      try {
        const response = await get_chapters({ course_id: course_id });
        konsole.log("response response chapters = = =>", response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const columns = [
    {
      title: t("Chapters Name"),
      key: "name",
      dataIndex: "name",
      render: (text: any, record: any) => {
        const chapter_id = record._id;
        return (
          <span
            className="cursor-pointer"
            onClick={() =>
              navigate(
                `/admin/courses/chapters/sections/${course_id}/${chapter_id}`
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
        const chapter_id = record._id;
        return (
          <>
            <Space direction="horizontal">
              <Button
                onClick={() =>
                  navigate(
                    `/admin/courses/chapters/chapteredit/${course_id}/${chapter_id}`
                  )
                }
              >
                {t("edit")}
              </Button>
              <Button
                onClick={() => {
                  showDeleteChapterConfirm({
                    title: "Delete Chapter?",
                    content: "Are you sure to delete the chapter?",
                    course_id: course_id,
                    chapter_id: chapter_id,
                  });
                }}
              >
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
        title={t("Chapters")}
        goBack
        // navigate to Create Chapter Page
        onCreateClick={() =>
          navigate(`/admin/courses/chapters/createchapter/${course_id}`)
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
