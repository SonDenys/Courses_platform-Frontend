import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ConfirmButton from "../../../components/ConfirmButton";
import InnerPageHeader from "../../../components/InnerPageHeader";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { prepare_query } from "../../../utils";
import { columns, table_data } from "../data";
import { delete_course, get_courses } from "../helpers/apicalls";
import { showDeleteCourseConfirm } from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";

export default function CoursePage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const toast = useMyToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await get_courses();
        konsole.log("response response = = =>", response);
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("There is an error somewhere");
      }
    })();
  }, []);

  const columns = [
    {
      title: t("Course Name"),
      key: "name",
      dataIndex: "name",
      render: (text: any, record: any) => {
        const course_id = record._id;
        return (
          <span
            className="cursor-pointer"
            onClick={() => navigate(`/admin/courses/chapters/${course_id}`)}
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
        const course_id = record._id;
        return (
          <>
            <Space direction="horizontal">
              <Button
                onClick={() =>
                  navigate(`/admin/courses/courseedit/${course_id}`)
                }
              >
                {t("edit")}
              </Button>
              <Button
                onClick={() => {
                  showDeleteCourseConfirm({
                    title: "Delete Course?",
                    content: "Are you sure to delete the course?",
                    course_id: course_id,
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
        title={t("Courses")}
        goBack
        onCreateClick={() => navigate("/admin/courses/createcourse")}
      />
      <Table
        className="ml-2 mr-2 !rounded-lg !border-gray-500"
        columns={columns}
        dataSource={data}
      />
      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
