import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";

export const useIsOwnProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();

  if (!username) return true;

  return username === user?.username;
};
