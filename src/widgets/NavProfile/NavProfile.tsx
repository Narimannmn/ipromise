import { Avatar, Dropdown, notification, Skeleton } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetUserMe } from "@/entities/User/hooks/hooks";
import { privateRoutesMap, publicRoutesMap } from "@/shared/navigation";
import styles from "./NavProfile.module.css";

export const NavProfile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserMe();
  const logout = useAuthStore((state) => state.logout);

  if (isLoading) {
    return (
      <>
        <Skeleton.Avatar
          style={{ width: 30, height: 30 }}
          active
          size={"small"}
        />
        <Skeleton.Input
          style={{ width: 100, height: 20 }}
          active
          size={"small"}
        />
      </>
    );
  }
  if (!user || error) {
    logout();
    notification.error({
      message: "Failed to enter app",
    });
    return <Navigate to={publicRoutesMap.login} />;
  }
  return (
    <Dropdown
      placement='bottomRight'
      menu={{
        items: [
          {
            key: "profile",
            icon: <AiOutlineUser />,
            label: "My Profile",
            onClick: () => {
              navigate(privateRoutesMap.profileMy);
            },
          },
          {
            key: "Sign Out",
            icon: <LiaSignOutAltSolid />,
            label: "Sign out",
            onClick: () => {
              logout();
              navigate(publicRoutesMap.login);
            },
          },
        ],
      }}
      trigger={["click"]}
    >
      <div className={styles.navProfile}>
        <Avatar
          src={
            user.avatar_url ||
            `https://ui-avatars.com/api/?name=${user.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
          }
          className={styles.avatar}
          icon={<FaRegUserCircle />}
          alt={`${user.username}  avatar`}
        />
        <span className={styles.userName}>{user.username}</span>
      </div>
    </Dropdown>
  );
};
