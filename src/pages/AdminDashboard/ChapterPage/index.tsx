import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

import { columns, table_data } from "../data";

export default function ChapterPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const columns = [
    {
      title: "Chapters name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span onClick={() => navigate("/admin/courses/chapters/sections")}>
          {text}
        </span>
      ),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Chapter",
      dataIndex: "chapter",
      key: "chapter",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <>
      <InnerPageHeader
        title={t("courses")}
        goBack
        onCreateClick={() => navigate("/admin/createcourse")}
      />
      <Table
        className="ml-2 mr-2  !rounded-lg !border-gray-500"
        columns={columns}
        dataSource={table_data}
      />
      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
