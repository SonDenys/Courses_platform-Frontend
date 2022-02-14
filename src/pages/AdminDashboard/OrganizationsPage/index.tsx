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
import {
  add_organization_to_course,
  delete_course,
  get_courses,
  get_organizations,
  remove_organization_from_course,
} from "../helpers/apicalls";
import { showDeleteCourseConfirm } from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";
import { selectedOrganization_State } from "../../../_GlobalStates/globalState";
import MyModal from "../../../components/ui/MyModal";

export default function OrganizationsPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const toast = useMyToast();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    selectedOrganization_State
  );

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

  // const handleDelete = async (course_id) => {
  //   try {
  //     const response = await remove_organization_from_course({
  //       course_id:
  //     });

  //     if (response) {
  //       const newData = organizations.filter((x: any) => x._id !== course_id);
  //       setOrganizations(newData);
  //     }
  //     if (!response) {
  //       console.log("Delete course failed");
  //     } else {
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log(
  //       "there is an error on the remove_organization_from_course api call"
  //     );
  //   }
  // };

  const handleMore = () => {
    setOpenModal(true);
  };
  // const handleMore_1 = () => {
  //   setOpenModal_1(true);
  // };

  const columns = [
    {
      title: t("Courses Name"),
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
              <ConfirmButton
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
              />
              <Button onClick={() => handleMore()}>{t("more")}</Button>
              {/* <Button onClick={() => handleMore_1()}>{t("more_1")}</Button> */}
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

      {/* If modal opened */}
      {openModal ? (
        <MyModal
          text1="Select the organization to invite"
          organizationToSelect={true}
          datePicker={true}
          button1_text="Confirm"
          button2_text="Cancel"
        />
      ) : (
        ""
      )}

      {/* {openModal_1 ? (
        <MyModal_1
          text1="Select the organization to invite"
          organizationToSelect={true}
        />
      ) : (
        ""
      )} */}

      {/* <MyTailwindTable columns={columns} dataSource={table_data} /> */}
    </>
  );
}
