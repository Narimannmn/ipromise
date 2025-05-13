import { Badge, Menu, Row, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "./routes";

export const Head = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState<string>(location.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Header style={{ backgroundColor: "#fff", padding: "0 100px" }}>
      <Row
        align='middle'
        justify='space-between'
      >
        {/* Left: Logo */}
        <h1 className='text-[#1890FF] text-sm font-bold'>iPromise</h1>

        {/* Center: Menu */}
        <IconContext.Provider value={{ size: "14" }}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={sidebarItems}
          />
        </IconContext.Provider>

        {/* Right: Icons + Profile */}
        <Space size='large'>
          QuestionCircleOutlined
          <Badge
            count={11}
            size='small'
          >
            BellOutlined
          </Badge>
          <Typography.Text strong>Nariman01!</Typography.Text>
        </Space>
      </Row>
    </Header>
  );
};
