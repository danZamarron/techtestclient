import React, {useState} from 'react'
import {Form, Input, Button, Row, Col, Typography, message} from 'antd'; 

import {signupService} from "../services/auth"
const { Title } = Typography;
const successMsg = () => message.success('Gracias por registrarse!');

const SignUp = (props) => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    const onFinish = async values => {
        setShowErrors(false)
        let result = await signupService(values)
        if(result.status === 200){
          successMsg();
          props.history.push("/login")
        }
        else
        {
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };
    
    return (
        <>

          <h2>Sign Up</h2>
          <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
      
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, whitespace: true }]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >          
                <Input.Password />
            </Form.Item>
      
  
            <Row justify="left">
              <Col >
                  {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
              </Col>
            </Row>
  
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Registrar
              </Button>
            </Form.Item>
          </Form>
        </>
    )
}

export default SignUp
