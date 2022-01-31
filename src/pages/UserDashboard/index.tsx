import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { data } from "./data";
import { useState } from "react";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function UserDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
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
                // onClick={}
              >
                {data?.map((subMenu) => {
                  return (
                    /* ------------------------- Chapter nav ------------------------- */
                    <SubMenu
                      key={`sub-${subMenu.id}`}
                      icon={<UserOutlined />}
                      title={subMenu.chapter_nav}
                    >
                      {(subMenu?.sections_courses || []).map((menu) => {
                        return (
                          <>
                            <Menu.Item
                              key={`${menu.name}-${menu.url}`}
                              onClick={() => navigate(menu.url)}
                            >
                              {t(menu.name)}
                            </Menu.Item>
                          </>
                        );
                      })}

                      {/*------------------------- Exercice nav -------------------------*/}
                      <SubMenu
                        key={`sub-sub--${subMenu.id}`}
                        // icon={<UserOutlined />}
                        title={subMenu.exercice_nav}
                      >
                        {(subMenu?.sections_practices || []).map((menu) => {
                          return (
                            <>
                              <Menu.Item
                                key={`${menu.name}-${menu.url}`}
                                onClick={() => navigate(menu.url)}
                              >
                                {t(menu.name)}
                              </Menu.Item>
                            </>
                          );
                        })}
                      </SubMenu>
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
