import { Button, Layout } from "antd";
// import { Content, Header, Footer } from "antd/lib/layout/layout";
// import Sider from "antd/lib/layout/Sider";
import { Outlet } from "react-router-dom";
import Comp1 from "../../components/comp1";
// import Header from "../../components/Header";

const { Sider, Content, Header, Footer } = Layout;


export default function MainApp() {
    return (
        <>
            <Layout>
                <Header> header </Header>
                <Layout>
                    <Sider>

                    </Sider>
                    <Content>
                        <h1 className="text-3xl text-red-600 font-bold underline">
                            Hello world!
                        </h1>
                        <Button type="primary" className='hover:animate-bounce hover:delay-500 hover:h-16 hover:w-48'>
                            Hello world!
                        </Button>
                        <Comp1 />

                        <Outlet />

                    </Content>

                </Layout>
                <Footer>
                    <span>Copyright AeonX AI</span>
                </Footer>
            </Layout>
            {/* <Header></Header> */}
        </>
    )
}