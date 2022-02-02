import { Space, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import InnerPageHeader from "../../../components/InnerPageHeader";
import MyButton from "../../../components/ui/Buttons/MyButton";
import MyButton1 from "../../../components/ui/Buttons/MyButton1";
import MyListContainers from "../../../components/ui/MyListContainers";
import MyTailwindTable from "../../../components/ui/MyTables/TailwindUiTable";
import { columns, table_data } from "../data";

export default function AdminHome() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <InnerPageHeader goBack={true}/>
      <h1>Admin Home</h1>
    </>
  );
}
