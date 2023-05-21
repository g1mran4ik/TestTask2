import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import './CustomLayout.css';

const { Header, Content } = Layout;

export default function CustomLayout({children}) {
  const { pathname } = useLocation();
  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={[
            {
              label: <Link to={"longconversion"}>Развёртывание</Link>,
              key: "/longconversion",
            },
            {
              label: <Link to={"shortconversion"}>Свертывание</Link>,
              key: "/shortconversion",
            },
            {
              label: <Link to={"history"}>История операций</Link>,
              key: "/history",
            },
          ]}
        ></Menu>
      </Header>
      <Content className="content">
        <div>{children}</div>
      </Content>
    </Layout>
  );
}
