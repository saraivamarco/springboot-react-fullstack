import {Table, Tag, Space, Empty, Spin, Button, Radio, Popconfirm, Image, Divider} from 'antd';

import {useState, useEffect} from 'react'
import {getAllStudents, deleteStudent, addNewStudent} from "./client";
import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined, DownloadOutlined, PlusOutlined,
} from '@ant-design/icons';

import './App.css';

import StudentDrawerForm from "./StudentDrawerForm";
import Avatar from "antd/es/avatar/avatar";
import {errorNotification, successNotification} from "./Notification";
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (name.trim().length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1){
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length-1)}`}
    </Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted", `Student ${studentId} was deleted`)
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [statusCode:${res.status}] [${res.error}]`
            );
        });
    });
}


const columns = fetchStudents => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group >
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure you want to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    onText='Yes'
                    canceltext='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    },

];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [collapsed, setCollapsed] = useState(false)
    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const fetchStudents = () =>
        getAllStudents()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [statusCode:${res.status}] [${res.error}]`
                );
            });
        }).finally(() => setFetching(false));

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if(fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <>
                    <StudentDrawerForm
                        showDrawer = {showDrawer}
                        setShowDrawer={setShowDrawer}
                        fetchStudents={fetchStudents}
                    />
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" shape="round" icon={<PlusOutlined />} size="small">
                        Add New Student
                    </Button>
                    <Empty/>
                </>

        }
        return <>
            <StudentDrawerForm
                showDrawer = {showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={()=>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined />} size="small">
                                      Add New Student
                        </Button>
                      }
                pagination={{pageSize:400}}
                scroll={{y:500}}
                rowKey={(student) => student.id}
            />
        </>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <Image width={25}
                       src="https://user-images.githubusercontent.com/8493884/130139309-4b2793b1-7f65-403b-9493-1085c386dca1.png"
                /> By Marco Saraiva da Silva</Footer>
            <Divider>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/marco-saraiva-silva/">
                    Click here to access my LinkedIn
                </a>
            </Divider>
        </Layout>
    </Layout>
}

    export default App;

