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
