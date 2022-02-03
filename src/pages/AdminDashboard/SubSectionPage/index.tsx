import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

import { columns, table_data } from "../data";

export default function SubSectionPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { course_id, section_id } = useParams();

  useEffect(() => {}, []);

  const columns = [
    {
      title: "SubSection name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span
          onClick={() =>
            navigate("/admin/courses/chapters/sections/subsections/edit")
          }
        >
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
    // {
    //     title: "Tags",
    //     key: "tags",
    //     dataIndex: "tags",
    //     render: (tags) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? "geekblue" : "green";
    //                 if (tag === "loser") {
    //                     color = "volcano";
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button>Modify</Button>
          <Button>Delete</Button>
          <Button>Activate</Button>
          <Button>Deactivate</Button>
        </Space>
      ),
      // get render() {
      //     return this._render;
      // },
      // set render(value) {
      //     this._render = value;
      // },
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
