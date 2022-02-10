import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmButton from "../../../components/ConfirmButton";
import InnerPageHeader from "../../../components/InnerPageHeader";
import OrganizationSelect from "../../../components/OrganizationSelect";
import { showDeleteChapterConfirm } from "../../../components/ui/helpers";
import konsole from "../../../konsole";

import { columns, table_data } from "../data";
import { delete_chapter, get_chapters } from "../helpers/apicalls";

export default function ChapterPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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

  const handleDelete = async ({ _id: chapter_id, course_id }) => {
    try {
      const response = await delete_chapter({
        _id: chapter_id,
        course_id: course_id,
      });

      if (response) {
        const newData = data.filter((x: any) => x._id !== chapter_id);
        setData(newData);
      }
      if (!response) {
        console.log("Delete chapter failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_chapter api call");
    }
  };

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
              <ConfirmButton
                buttonText="delete"
                title="Are you sure to delete this chapter?"
                onConfirm={() => handleDelete({ _id: chapter_id, course_id })}
              />
              {/* <Button
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
      // navigate to Create Chapter Page
      onClick={() =>
        navigate(`/admin/courses/chapters/createchapter/${course_id}`)
      }
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Chapters")}
        goBack
        extra={extra}
        // navigate to Create Chapter Page
        // onCreateClick={() =>
        //   navigate(`/admin/courses/chapters/createchapter/${course_id}`)
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
