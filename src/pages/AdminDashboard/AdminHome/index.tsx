import { Space, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";

export default function AdminHome() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <InnerPageHeader goBack />
      <h1>Admin Home</h1>
    </>
  );
}
