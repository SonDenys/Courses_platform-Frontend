import { Button, Space, Table, Tag } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import InnerPageHeader from "../../../components/InnerPageHeader";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { prepare_query } from "../../../utils";

import {
  refreshPage,
  showDeleteCourseConfirm,
} from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";
import { selectedOrganization_State } from "../../../_GlobalStates/globalState";
import MyModalTailwind from "../../../components/ui/MyModal/MyModalTailwind";
import { getUserId } from "../../../Auth";

export default function StudentsListPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [studentId, setStudentId] = useState("");
  const toast = useMyToast();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { course_id, organization_id } = useParams();

  // const [selectedOrganization, setSelectedOrganization] = useRecoilState(
  //   selectedOrganization_State
  // );

  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await get_users_of_organization({
  //         organization_id,
  //       });
  //       konsole.log("get_users_of_organizations response = = =>", response);
  //       setData(response.data);

  //       // setUserId(await getUserId());

  //       // setOrganizationId(
  //       //   response.data.map((item) => {
  //       //     return item._id;
  //       //   })
  //       // );
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("There is an error somewhere");
  //     }
  //   })();
  // }, []);

  // console.log("student_id =======>", studentId);

  // const handleDelete = async ({ user_id, course_id, organization_id }) => {
  //   try {
  //     const response = await remove_user_from_course({
  //       user_id: studentId,
  //       course_id,
  //       organization_id,
  //     });

  //     if (response) {
  //       const newData = data.filter((x: any) => x._id !== user_id);
  //       setData(newData);
  //       console.log("user_id selected = === >", user_id);
  //     }
  //     if (!response) {
  //       console.log("Remove user failed");
  //     } else {
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log("there is an error on the remove_user_from_course api call");
  //   }
  // };

  const columns = [
    {
      title: t("Username"),
      key: "username",
      dataIndex: "username",
      render: (text: any, record: any) => {
        const user_id = record._id;
        return (
          <span
          // className="cursor-pointer"
          // onClick={() => navigate(`/admin/courses/chapters/${course_id}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
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
        const user_id = record._id;

        return (
          <>
            <Space direction="horizontal">
              {/* <ConfirmButton
                buttonText="invite"
                title={`Are you sure to invite ${selectedOrganization.name} to the course?`}
                onConfirm={() =>
                  add_organization_to_course({
                    course_id: course_id,
                    organization_id: selectedOrganization._id,
                    start_time: "2022-02-14T14:28:34.462Z",
                    end_time: "2022-03-12T14:28:34.462Z",
                  })
                }
              /> */}
              <ConfirmButton
                buttonText="remove"
                title={`Are you sure to remove this student from the organization and the course?`}
                // onConfirm={() =>
                //   handleDelete({
                //     course_id: course_id,
                //     organization_id: organization_id,
                //     user_id: studentId,
                //   })
                // }
              />

              {/* <Button onClick={() => handleMore_1()}>{t("more_1")}</Button> */}
            </Space>
          </>
        );
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
      onClick={() => navigate("/user/students/createorganization")}
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Students List of the organization")}
        goBack
        extra={extra}
        // onCreateClick={() => navigate("/admin/courses/createcourse")}
      />
      <p className="text-red-600">{errorMessage}</p>
      <Table
        className="ml-2 mr-2 !rounded-lg !border-gray-500"
        // columns={columns}
        // dataSource={data}
      />

      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
