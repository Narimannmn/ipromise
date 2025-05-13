import { Badge, Flex, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineBell, AiOutlineQuestionCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { NavProfile } from "../NavProfile/NavProfile";
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
        <h1 className='text-[#1890FF] text-sm font-bold'>IPromise</h1>

        <IconContext.Provider value={{ size: "16" }}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={sidebarItems}
          />
        </IconContext.Provider>

        <IconContext.Provider value={{ size: "16" }}>
          <Flex
            gap={24}
            align={"center"}
          >
            <AiOutlineQuestionCircle style={{ cursor: "pointer" }} />

            <Badge
              count={11}
              size='small'
            >
              <AiOutlineBell style={{ cursor: "pointer" }} />
            </Badge>
            <NavProfile />
          </Flex>
        </IconContext.Provider>
      </Row>
    </Header>
  );
};
