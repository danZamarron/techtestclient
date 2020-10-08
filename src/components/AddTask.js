import React, {useState, useEffect,forwardRef, useImperativeHandle} from 'react'
import { Form, Input, Row, Col, Typography, message } from "antd"
import {addTaskService} from "../services/task"

const { Title } = Typography;
const successMsg = () => message.success('Se agrego la task');


const AddTask = forwardRef((props, ref) => {

    const {closeModal, mutateSWR, mutateURL} = props;
    const [form] = Form.useForm()
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    useImperativeHandle(
        ref,
        () => ({
            addTask() {
                form.submit()
            }
         }),
     )

     useEffect(() => {
        return function cleanup() {
            form.resetFields(["title","description"])
        };
      });


    async function submitFormFromChild(values){        
        setShowErrors(false)
        let result = await addTaskService(values)
        if(result.status === 201){
            successMsg();
            closeModal(false)
            mutateSWR(mutateURL)
        }
        else
        {
            setShowErrors(true)
            setShowMsg(result.message)
        }
      }

    return (
        <>                    
            <Form layout='vertical' form={form} onFinish={submitFormFromChild}>
                <Form.Item
                      name="title"
                      label="Titulo de la Task"
                      rules={[{ required: true, message: 'Favor de escribir un titulo de task', whitespace: true }]}
                  >
                      <Input />
                  </Form.Item>

                  <Form.Item
                      name="description"
                      label="Descripcion de la Task"
                      rules={[{ required: true, message: 'Favor de escribir una descripcion ', whitespace: true }]}
                  >
                      <Input />
                  </Form.Item>
  
                  <Row justify="center">
                      <Col >
                          {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                      </Col>
                  </Row>  
              </Form>            
        </>
    )
})

export default AddTask
