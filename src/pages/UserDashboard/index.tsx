import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { data } from "./data/index";
import { useEffect, useState } from "react";
import { LibraryIcon } from "@heroicons/react/solid";
import TopBar from "../../components/Topbar";
import {
  get_courses,
  get_courses_of_user,
} from "../AdminDashboard/helpers/apicalls";
import konsole from "../../konsole";
import { useMyToast } from "../../_GlobalStates/hooks";
import { getUserId } from "../../Auth";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function UserDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [dataList, setDataList] = useState([]);
  const location = useLocation();
  const toast = useMyToast();
  // const [data, setData] = useState([]);

  console.log("location.pathname");
  console.log(location);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await get_courses_of_user({
  //         user_id: user_id,
  //         organization_id: organization_id,
  //       });
  //       konsole.log(
  //         "response response get_courses_of_user in the userAdmin = = =>",
  //         response
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("There is an error somewhere");
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await get_courses_of_user({
          user_id: await getUserId(),
        });
        konsole.log(
          "response response get_courses_of_user in the userAdmin = = =>",
          response
        );
        setDataList(response.data);
      } catch (error) {
        console.log(error);
        toast.error("There is an error somewhere");
      }
    })();
  }, []);

  return (
    <>
      <Layout>
        <TopBar></TopBar>
        <Content className="w-auto">
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              className="site-layout-background"
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                className="h-screen w-auto"
                selectedKeys={[location.pathname]}
                // onClick={}
              >
                {data?.map((subMenu) => {
                  return (
                    /* ------------------------- Courses nav ------------------------- */
                    <SubMenu
                      key={`sub-${subMenu.id}`}
                      icon={<LibraryIcon className="h-5 w-5" />}
                      title={subMenu.chapter_nav}
                    >
                      {subMenu?.sections_courses?.map((menu) => {
                        return (
                          <>
                            <Menu.Item
                              key={menu.url}
                              onClick={() => navigate(menu.url)}
                            >
                              {t(menu.name)}
                            </Menu.Item>
                          </>
                        );
                      })}

                      {/* -------------------- Students nav -------------------------- */}

                      {subMenu?.sections_students?.map((menu) => {
                        return (
                          <>
                            <Menu.Item
                              key={menu.url}
                              onClick={() => navigate(menu.url)}
                            >
                              {t(menu.name)}
                            </Menu.Item>
                          </>
                        );
                      })}

                      {/*------------------------- Exercices nav -------------------------*/}
                      {/* {subMenu?.sections_practices && (
                        <SubMenu
                          key={`sub-sub--${subMenu.id}`}
                          // icon={<UserOutlined />}
                          title={subMenu.exercice_nav}
                        >
                          {subMenu?.sections_practices?.map((menu) => {
                            return (
                              <>
                                <Menu.Item
                                  key={menu.url}
                                  onClick={() => navigate(menu.url)}
                                >
                                  {t(menu.name)}
                                </Menu.Item>
                              </>
                            );
                          })}
                        </SubMenu>
                      )} */}
                    </SubMenu>
                  );
                })}
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
