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
import { get_courses } from "../helpers/apicalls";

export default function CoursePage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await get_courses();
        konsole.log("response response = = =>", response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data]);


  const columns = [
    {
      title: t("Course Name"),
      key: "name",
      dataIndex: "name",
      render: (text: any, record: any) => {
        const course_id = record._id;
        return (
          <span onClick={() => navigate(`/admin/courses/sections/${course_id}`)}>{text}</span>
        )
      }
    },
    {
      title: t("actions"),
      key: "actions",
      // dataIndex: "actions",
      render: (text: any, record: any) => {
        const course_id = record._id;
        return (<>
          <Space direction="horizontal">
            <Button onClick={() => navigate(`/admin/courses/courseedit/${course_id}`)}>{t("edit")}</Button>
            <Button onClick={() => console.log("delete course")}>{t("delete")}</Button>
          </Space>
        </>)
      }

    }
  ]


  return (
    <>
      <InnerPageHeader
        title={t("courses")}
        goBack
        onCreateClick={() => navigate("/admin/courses/createcourse")}
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
