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

const admin_sider_data = [
  {
    id: "1",
    name: "Home",
    url: "/admin/home",
    tag: "home",
    submenu: []
  },
  {
    id: "2",
    name: "Courses",
    url: "/admin/courses",
    tag: "courses",
    submenu: [],
  },
  {
    id: "3",
    name: "Active Courses",
    url: "/admin/actve_courses",
    tag: "active_courses",
    submenu: [],
  },
  {
    id: "4",
    name: "Settings",
    url: "/admin/settings",
    tag: "admin_settings",
    submenu: [],
  },

]


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
                title="Navigation"
              >
                {admin_sider_data?.map((menu_item: any) => {
                  const submenu = menu_item?.submenu;

                  console.log(menu_item);

                  
                    return (
                      <SubMenu
                        key={`sub-${menu_item.id}`}
                        icon={submenu && <AcademicCapIcon className="h-5 w-5" />}
                        title={menu_item.name}
                        onTitleClick={() => {navigate(menu_item.url)}}
                      >
                        {submenu?.menu_nav?.map((menu) => {
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
                  

                  // return (
                  //   <Menu.Item title={menu_item.name}>  

                  //     </Menu.Item>

                  // )
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
