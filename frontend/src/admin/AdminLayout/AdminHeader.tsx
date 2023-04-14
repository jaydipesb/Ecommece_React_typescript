import {  Space, Typography,Button, message } from "antd";
import { useNavigate } from "react-router-dom";


function AdminHeader() {
  const navigate = useNavigate();

const logout = () =>{
  localStorage.clear();
  navigate("/login");
  message.success("logout successfully");
}

  return (
    <div className="AppHeader">
     
      <Typography.Title>Admin Dashboard</Typography.Title>
      <Space>
      <Button type="primary"  onClick={logout}>
          Logout
        </Button>
        </Space>

    </div>
  );
}
export default AdminHeader;
