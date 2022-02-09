import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import InnerPageHeader from "../../../components/InnerPageHeader";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { prepare_query } from "../../../utils";
import { columns, table_data } from "../data";
import { delete_course, get_courses } from "../helpers/apicalls";
import { showDeleteCourseConfirm } from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";

export default function CoursePage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const toast = useMyToast();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

  const handleDelete = async (course_id) => {
    try {
      const response = await delete_course({ _id: course_id });

      if (response) {
        const newData = data.filter((x: any) => x._id !== course_id);
        setData(newData);
      }
      if (!response) {
        console.log("Delete course failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_course api call");
    }
  };

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

              <ConfirmButton
                buttonText="delete"
                title="delete"
                onConfirm={() => handleDelete(course_id)}
              />
              {/* <Button
                onClick={() => {
                  showDeleteCourseConfirm({
                    title: "Delete Course?",
                    content: "Are you sure to delete the course?",
                    course_id: course_id,
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
      // navigate to Create Course Page
      onClick={() => navigate("/admin/courses/createcourse")}
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Courses")}
        goBack
        extra={extra}
        // onCreateClick={() => navigate("/admin/courses/createcourse")}
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
