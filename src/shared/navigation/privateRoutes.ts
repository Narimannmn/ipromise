export const privateRoutesMap = {
  feed: "/feed",
  profile: "/profile/:username",
  profileMy: "/profile",
  promises: "/promises/:username",
  promisesMy: "/promises",
  friends: "/friends/:username",
  friendsMy: "/friends",
} as const;
