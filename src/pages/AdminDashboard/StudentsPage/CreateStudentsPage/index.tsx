import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import InnerPageHeader from "../../../../components/InnerPageHeader/index";

const CreateStudentsPage = () => {
  return (
    <>
      <InnerPageHeader />
      <Layout>
        <Content>
          <h1>Create Students Page</h1>
        </Content>
      </Layout>
    </>
  );
};

export default CreateStudentsPage;
