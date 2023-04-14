import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import AdminFooter from './AdminFooter'
const { Content } = Layout


const AdminMain = () => {
  return (
    <>
            <Layout className="main-layout">
                <AdminHeader />
                <div className="SideMenuAndPageContent">
                {/* <Layout> */}
                    <AdminSidebar />
                    <Content style={{ padding: '24px 24px', background: 'white', minHeight: "500px" }}>
                        <Outlet />
                    </Content>
                {/* </Layout> */}
                </div>
                <AdminFooter/>
            </Layout>
        </>
  )
}

export default AdminMain
