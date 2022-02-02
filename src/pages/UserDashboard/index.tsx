import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { data } from "./data/index";
import { useState } from "react";
import { LibraryIcon } from "@heroicons/react/solid";
import TopBar from "../../components/Topbar";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function UserDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  console.log("location.pathname");
  console.log(location);

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
                    /* ------------------------- Chapter nav ------------------------- */
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

                      {/*------------------------- Exercice nav -------------------------*/}
                      {subMenu?.sections_practices && (
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
                      )}
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
