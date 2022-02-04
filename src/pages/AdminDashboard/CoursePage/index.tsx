import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import InnerPageHeader from "../../../components/InnerPageHeader";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { course_idState } from "../../../_GlobalStates/globalState";

import { columns, table_data } from "../data";
import { get_courses } from "../helpers/apicalls";
import { prepare_query } from "../helpers/utils";

export default function CoursePage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [course_id, setCourse_id] = useRecoilState(course_idState);

  const query: any = prepare_query(
    {
      _id: "_id",
      do_list: false,
    },
    true
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await get_courses({ _id: "_id" });
        konsole.log("response response = = =>", response);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const columns = [
    {
      title: "Courses name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span onClick={() => navigate("/admin/courses/chapters")}>{text}</span>
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button>Modify</Button>
    //       <Button>Delete</Button>
    //       <Button>Activate</Button>
    //       <Button>Deactivate</Button>
    //     </Space>
    //   ),
    // get render() {
    //     return this._render;
    // },
    // set render(value) {
    //     this._render = value;
    // },
    // },
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
