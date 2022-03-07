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
  get_organizations_of_user,
  remove_organization_from_course,
} from "../helpers/apicalls";
import {
  refreshPage,
  showDeleteCourseConfirm,
} from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";
import {
  selectedOrganization_State,
  signUserIdState,
} from "../../../_GlobalStates/globalState";
import MyModalTailwind from "../../../components/ui/MyModal/MyModalTailwind";
import { getUserId } from "../../../Auth";

export default function OrganizationsPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const toast = useMyToast();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [course_id, setCourse_id] = useState("");

  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    selectedOrganization_State
  );
  const [signedUserId, setSignedUserId] = useRecoilState(signUserIdState);

  const [errorMessage, setErrorMessage] = useState("");

  // const user_id_test = "622609780650b3390ad56480";

  useEffect(() => {
    (async () => {
      try {
        const response = await get_organizations_of_user({
          user_id: await getUserId(),
        });
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInvite = async () => {
    try {
      const response = await add_organization_to_course({
        course_id: course_id,
        organization_id: selectedOrganization._id,
        start_time: "2022-02-14T14:28:34.462Z",
        end_time: "2022-03-12T14:28:34.462Z",
      });

      if (!response) {
        setErrorMessage("The organization has not been invited");
      } else {
      }

      if (!selectedOrganization) {
        setErrorMessage("You forget to select a organization");
      }
    } catch (error) {
      console.log(error);
      toast.error(t("could_not_add_organization"));
    }
  };

  const columns = [
    {
      title: t("Organizations Name"),
      key: "name",
      dataIndex: "name",
      render: (text: any, record: any) => {
        const organization_id = record._id;

        return (
          <span
            className="cursor-pointer"
            onClick={() =>
              navigate(
                `/admin/organizations/users_of_organization/${organization_id}`
              )
            }
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
    // {
    //   title: t("actions"),
    //   key: "actions",
    //   // dataIndex: "actions",
    //   render: (text: any, record: any) => {
    //     const course_id = record._id;
    //     setCourse_id(course_id);

    //     return (
    //       <>
    //         <Space direction="horizontal">
    //           <ConfirmButton
    //             buttonText="invite"
    //             title={`Are you sure to invite ${selectedOrganization.name} to the course?`}
    //             onConfirm={() =>
    //               add_organization_to_course({
    //                 course_id: course_id,
    //                 organization_id: selectedOrganization._id,
    //                 start_time: "2022-02-14T14:28:34.462Z",
    //                 end_time: "2022-03-12T14:28:34.462Z",
    //               })
    //             }
    //           />
    //           <Button onClick={() => openModal()}>{t("more")}</Button>
    //           {/* <Button onClick={() => handleMore_1()}>{t("more_1")}</Button> */}
    //         </Space>
    //       </>
    //     );
    //   },
    // },
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
      onClick={() => navigate("/admin/organizations/createorganization")}
      //   onClick={handleClickCreate}
    >
      {t("create")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Organizations")}
        goBack
        extra={extra}
        // onCreateClick={() => navigate("/admin/courses/createcourse")}
      />
      <p className="text-red-600">{errorMessage}</p>
      <Table
        className="ml-2 mr-2 !rounded-lg !border-gray-500"
        columns={columns}
        dataSource={data}
      />

      {/* If modal opened */}
      {isOpen ? (
        <MyModalTailwind
          text1="Select the organization to invite"
          organizationToSelect={true}
          datePicker1={true}
          datePicker2={true}
          button1_text="Confirm"
          button1_close={() => handleInvite()}
          button2_text="Cancel"
          button2_close={() => closeModal()}
          heightScreen="h-screen"
          widthFull="w-1/2"
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
