import { Space, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

const AdminSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <InnerPageHeader goBack />
      <h1>Admin Settings</h1>
    </>
  );
};

export default AdminSettings;
