import React, {useContext} from 'react'
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { Link } from "react-router-dom"

import { logoutService } from "../services/auth"
import { AppContext } from "../context"
const successMsg = () => message.success('Sesion terminada');

const { Header, Content, Footer } = Layout;
const contentStyle = {
    background: "#ffffff",
    padding: "24px",
    minHeight: "280px"
}

const logoStyle = 
{
    width: "120px",
    height: "31px",
    background: "rgba(255, 255, 255, 0.2)",
    margin: "16px 24px 16px 0",
    float: "left"
}


const LayOut = ({children}) => {

    const { clearContextUser, user } = useContext(AppContext)


    const logoutProcess = async () => {
        await logoutService()
        clearContextUser()
        successMsg()
    }

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header>
            <div style={logoStyle}/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
                {!user &&<Menu.Item key="2"><Link to='/login'>Login</Link></Menu.Item>}
                {!user &&<Menu.Item key="3"><Link to='/signup'>Sign Up</Link></Menu.Item>}
                {user &&<Menu.Item key="4"><Link to='/' onClick={logoutProcess} >Cerrar Sesion de {user?.username}</Link></Menu.Item>}
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '20px' }}>
                {user && <Breadcrumb.Item>Estas Logeado como: <strong>{user?.username}</strong></Breadcrumb.Item>}
            </Breadcrumb>
                <div style={contentStyle}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default LayOut
