import { Avatar, Dropdown, notification, Skeleton } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetUserMe } from "@/entities/User/hooks/hooks";
import { privateRoutesMap, publicRoutesMap } from "@/shared/navigation";
import styles from "./NavProfile.module.css";
import { LogoutIcon } from "@/components/ui/logout";
import { UserIcon } from "@/components/ui/user";

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
            icon: <UserIcon size={16} />,
            label: "My Profile",
            onClick: () => {
              navigate(privateRoutesMap.profileMy);
            },
          },
          {
            key: "Sign Out",
            icon: <LogoutIcon size={16} />,
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
