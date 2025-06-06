import type { MenuProps } from "antd";
import { privateRoutesMap } from "@/shared/navigation";
import { BookTextIcon } from "@/components/ui/book-text";
import { ClipboardCheckIcon } from "@/components/ui/clipboard-check";
import { UsersIcon } from "@/components/ui/users";

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
    icon: <BookTextIcon size={16} />,
  },
  {
    key: privateRoutesMap.promisesMy,
    label: "Promises",
    icon: <ClipboardCheckIcon size={16} />,
  },
  {
    key: privateRoutesMap.friendsMy,
    label: "Friends",
    icon: <UsersIcon size={16} />,
  },
];

// export const collapsedSidebarItems: SidebarItem[] = sidebarItems.flatMap(
//   (group) => (group.type === "group" ? group.children : []),
// );
