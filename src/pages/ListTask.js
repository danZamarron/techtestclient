import React, {useContext, useState, useRef} from 'react'
import { Table, Modal, Button, Row, Col, message} from 'antd';
import useSWR, { mutate } from "swr";
import { AppContext } from "../context"
import AddTask from "../components/AddTask"
import {deleteTaskService, doneTaskService } from "../services/task"


const url = "http://localhost:4000/api/task"
const fetcher = url => fetch(url).then(res => res.json());

const { Column } = Table;
const { confirm } = Modal;

const notLogged = () => <h5>No estas logeado</h5>


const ListTask = () => {

    const { user } = useContext(AppContext)

    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const childRef = useRef();

    function showDeleteConfirm({title, _id: taskId}) {
        confirm({
        title: `Borrar Task`,
        content: `Borrar la Task ${title}`,
        okText: 'Si',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteTask(taskId)
        },
        onCancel() {
        },
        });
    }

    async function deleteTask(taskId)
    {
        let result = await deleteTaskService(taskId)
        if(result.status === 200)
        {
            message.success('Se elimino la task satisfactoriamente');
            mutate(url)
        }
        else{
            message.error(result.message)
        }
    }

    function showDoneConfirm({title, _id: taskId}) {
        confirm({
        title: `Finalizar Task`,
        content: `Finalizar la Task ${title}`,
        okText: 'Si',
        okType: 'primary',
        cancelText: 'No',
        onOk() {
            doneTask(taskId)
        },
        onCancel() {
        },
        });
    }

    async function doneTask(taskId)
    {
        let result = await doneTaskService(taskId)
        if(result.status === 201)
        {
            message.success('Se termino la task satisfactoriamente');
            mutate(url)
        }
        else{
            message.error(result.message)
        }
    }


    const { data, error } = useSWR(
        url,
        fetcher
      );
    
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    return (
        <div>
            <Row>
                <Col>
                    {user ? 
                        (
                            <>
                            <Button block type="primary" onClick={() => setShowModalAgregar(true)}>
                                Agrega una Task
                            </Button>

                            <Modal
                                centered
                                title={'Agrega Task'}
                                visible={showModalAgregar}
                                onCancel={() => setShowModalAgregar(false)}
                                onOk={() => {
                                    childRef.current.addTask()
                                }}
                                width={700}

                            >
                                <AddTask ref={childRef}  
                                            closeModal={setShowModalAgregar}
                                            mutateSWR = {mutate}
                                            mutateURL = {url} />
                            </Modal>
                            </>
                        )
                        :
                        <></>
                    }
                </Col>
            </Row>


            <Table style={{marginTop:"30px"}} key={"x"} rowKey={record => record._id} dataSource={data}>
                <Column title="Titulo" dataIndex="title" key="title" />
                <Column title="Descripcion" dataIndex="description" key="description" />
                <Column title="Creada por" dataIndex="userCreated" key="userCreated"  
                render={(text, record) => (
                    <>
                        {record.userCreated.username}
                    </>
                )}

                />
                
                <Column
                title="Finalizar Task"
                key="Done"
                align="center"
                render={(text, record) => (
                    <>
                        
                        {
                            (user) ? 
                            (
                                (record.userAccepted) ?
                                (
                                    <h4>Terminada por: {record.userAccepted.username}</h4>
                                )
                                :
                                (
                                    <Button onClick={() => showDoneConfirm(record)} type="primary">
                                            Finalizar
                                    </Button>
                                )
                            )
                            :
                            notLogged()
                            
                        }
                        
                    </>
                )}
                />

                <Column
                    title="Borrar Task"
                    key="Delete"
                    align="center"
                    render={(text, record) => (
                        <>
                            
                            {
                                (user) ? 
                                (
                                    (record.userCreated._id === user._id) ?
                                    (
                                        <Button onClick={() => showDeleteConfirm(record)} type="danger">
                                            Borrar Task
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button disabled type="dashed">
                                            Not Task's Autor
                                        </Button>
                                    )
                                )
                                :                                
                                notLogged()
                            }
                            
                        </>
                    )}
                />

            </Table>
        </div>
    )
}

export default ListTask
