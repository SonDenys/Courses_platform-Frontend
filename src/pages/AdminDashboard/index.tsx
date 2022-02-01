import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { data } from "./data";
import { useState } from "react";
import { LibraryIcon } from "@heroicons/react/solid";
import { AcademicCapIcon } from "@heroicons/react/solid";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  console.log("location.pathname");
  console.log(location);

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
              className="w-auto h-screen"
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                className="w-auto h-screen"
                selectedKeys={[location.pathname]}
              >
                {data?.map((subMenu) => {
                  return (
                    <SubMenu
                      key={`sub-${subMenu.id}`}
                      icon={<AcademicCapIcon className="h-5 w-5" />}
                      title={subMenu.chapter_nav}
                    >
                      {subMenu?.menu_nav?.map((menu) => {
                        return (
                          <Menu.Item
                            key={menu.url}
                            onClick={() => navigate(menu.url)}
                          >
                            {t(menu.name)}
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                })}
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              Outlet
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
