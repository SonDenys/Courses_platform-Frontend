import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";

import Column, { ColumnProps } from "antd/lib/table/Column";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CourseSelect from "../../../components/CourseSelect";
import InnerPageHeader from "../../../components/InnerPageHeader";
import OrganizationSelect from "../../../components/OrganizationSelect";
import { refreshPage } from "../../../components/ui/helpers";

import { columns, table_data } from "../data";

export default function ActiveCoursePage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickCreate = () => {
    console.log("clicked");
  };

  useEffect(() => {}, []);

  const columns: any[] = [
    {
      title: "Active Courses name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span onClick={() => navigate("/admin/active_courses/edit")}>
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
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      _render: (text, record) => (
        <Space size="middle">
          <Button>Activate</Button>
          <Button>Deactivate</Button>
        </Space>
      ),
      get render() {
        return this._render;
      },
      set render(value) {
        this._render = value;
      },
    },
  ];

  const extra = [
    // <OrganizationSelect
    //   key={"header_000"}
    //   onChange={props.onChangeOrganization}
    //   readOnly={props.organizationReadOnly}
    // />,
    <Button
      key={`header_001`}
      type="ghost"
      size="middle"
      onClick={() => refreshPage()}
      // onClick={props.onRefreshClick as any}
    >
      {t("refresh")}
    </Button>,
    <Button
      key={`header_002`}
      type="ghost"
      size="middle"
      // navigate to Create Course Page
      onClick={() => navigate("/admin/active_courses/createactivecourse")}
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader title={t("Active Courses")} goBack extra={extra} />

      <Table
        className="ml-2 mr-2  !rounded-lg !border-gray-500"
        columns={columns}
        // dataSource={table_data}
      />
      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
