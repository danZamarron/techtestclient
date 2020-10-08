import React, {useState, useContext} from 'react'
import { Form, Input, Button, Row, Col, Typography, message} from 'antd';
import {loginService} from "../services/auth"
import { AppContext } from "../context"

const { Title } = Typography;
const successMsg = (username) => message.success(`Gracias por entrar ${username}`);

const Login = (props) => {

    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")
    const { setContextUser } = useContext(AppContext)
    
    const onFinish = async values => {    
        setShowErrors(false)
        let result = await loginService(values)
        if(result.status === 200){
            result.data.password = "";
            setContextUser(result.data)
            successMsg(result.data.username);
            props.history.push("/")
        }
        else
        {
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };


    return (
        <div>
        <h2>Login</h2>
        <Form
        name="normal_login"
        form={form}
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
            <Form.Item
                name="username"
                label="Username"
                rules=
                {[
                    {
                    required: true
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
            >
                <Input.Password/>
            </Form.Item>

            
            <Row justify="center">
                <Col >
                    {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                </Col>
            </Row>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>

    </div>
    )
}

export default Login
