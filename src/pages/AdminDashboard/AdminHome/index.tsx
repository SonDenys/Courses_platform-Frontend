import { Space, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../../../components/ui/Buttons/MyButton";
import MyButton1 from "../../../components/ui/Buttons/MyButton1";
import MyListContainers from "../../../components/ui/MyListContainers";
import MyTailwindTable from "../../../components/ui/MyTables/TailwindUiTable";
import { columns, table_data } from "../data";

export default function AdminHome() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between px-5">
        <div>
          <h1>Admin Home {id}</h1>
          <p>This is the Admin Home {id}</p>
        </div>

        <div>
          <MyButton
            name="Create"
            onClick={() => navigate(`/admin/creation/${id}`)}
          />
        </div>
      </div>
      <div>
        {/* <MyListContainers /> */}
        Ant Table
        <Table columns={columns} dataSource={table_data} />
        Tailwind Table
        <MyTailwindTable columns={columns} dataSource={table_data} />
      </div>
    </div>
  );
}
