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
import TopBar from "../../components/Topbar";

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
          <TopBar />
        <Content className="w-auto">
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Layout

            className="p-0 site-layout-background"            
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
            <Content className="!p-0">
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
