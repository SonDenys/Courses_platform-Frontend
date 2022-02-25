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
import { columns, table_data } from "../data";
import {
  refreshPage,
  showDeleteCourseConfirm,
} from "../../../components/ui/helpers/index";
import { useMyToast } from "../../../_GlobalStates/hooks";
import OrganizationSelect from "../../../components/OrganizationSelect";
import ConfirmButton from "../../../components/ConfirmButton";
import {
  emailStateReceiver,
  selectedOrganization_State,
} from "../../../_GlobalStates/globalState";
import MyModalTailwind from "../../../components/ui/MyModal/MyModalTailwind";
import {
  add_organization_to_course,
  get_users_of_organization,
  send_invitation_email,
} from "../helpers/apicalls";

export default function UsersOfOrganizationPage(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const toast = useMyToast();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [course_id, setCourse_id] = useState("");
  const [email, setEmail] = useState("");
  const [scopes, setScopes] = useState("");

  const { organization_id } = useParams();

  // const [selectedOrganization, setSelectedOrganization] = useRecoilState(
  //   selectedOrganization_State
  // );

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await get_users_of_organization({
          organization_id: organization_id,
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

  // const handleInvite = async () => {
  //   try {
  //     const response = await add_organization_to_course({
  //       course_id: course_id,
  //       organization_id: selectedOrganization._id,
  //       start_time: "2022-02-14T14:28:34.462Z",
  //       end_time: "2022-03-12T14:28:34.462Z",
  //     });

  //     if (!response) {
  //       setErrorMessage("The organization has not been invited");
  //     } else {
  //     }

  //     if (!selectedOrganization) {
  //       setErrorMessage("You forget to select a organization");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(t("could_not_add_organization"));
  //   }
  // };

  const sendInvitation = async () => {
    try {
      const response = await send_invitation_email({
        organization_id: organization_id,
        email: email,
        scopes: scopes,
      });
      if (!response) {
        setErrorMessage("The invitation has not been sent");
      }
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(t("could_not_add_organization"));
    }
  };

  console.log("email receiver :", email);
  console.log("scope :", scopes);

  const columns = [
    {
      title: t("Firstname"),
      key: "firstname",
      dataIndex: "firstname",
      render: (text: any, record: any) => {
        const organization_id = record._id;
        return (
          <span
          // className="cursor-pointer"
          // onClick={() =>
          //   navigate(
          //     `/admin/organizations/users_of_organization/${organization_id}`
          //   )
          // }
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
    { title: "Email", dataIndex: "email", key: "email" },
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
      // onClick={() => navigate("/admin/organizations/createorganization")}
      onClick={openModal}
    >
      {t("invite")}
    </Button>,
  ];

  return (
    <>
      <InnerPageHeader
        title={t("Users Of Organizations")}
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
          text1="Send an invitation email"
          organizationToSelect={false}
          datePicker1={false}
          datePicker2={false}
          button1_text="Send"
          button1_close={() => sendInvitation()}
          button2_text="Cancel"
          button2_close={() => closeModal()}
          input1={true}
          onChange_input1={setEmail}
          input2={true}
          onChange_input2={setScopes}
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
