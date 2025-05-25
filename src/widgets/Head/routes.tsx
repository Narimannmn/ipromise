import type { MenuProps } from "antd";
import {
  AiOutlineCheckSquare,
  AiOutlineContainer,
  AiOutlineTeam,
} from "react-icons/ai";
import { privateRoutesMap } from "@/shared/navigation";

type MenuItem = Required<MenuProps>["items"][number];

export const sidebarItems: MenuItem[] = [
  {
    key: privateRoutesMap.feed,
    label: (
      <span
        className='joyride-feed'
        id='navbar-feed'
      >
        Feed
      </span>
    ),
    icon: <AiOutlineContainer />,
  },
  {
    key: privateRoutesMap.promisesMy,
    label: "Promises",
    icon: <AiOutlineCheckSquare />,
  },
  {
    key: privateRoutesMap.friendsMy,
    label: "Friends",
    icon: <AiOutlineTeam />,
  },
];

// export const collapsedSidebarItems: SidebarItem[] = sidebarItems.flatMap(
//   (group) => (group.type === "group" ? group.children : []),
// );
