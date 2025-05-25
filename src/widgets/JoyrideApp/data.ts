import { Step } from "react-joyride";

export const stepStages: { path: string; steps: Step[] }[] = [
  {
    path: "/feed",
    steps: [
      {
        target: "#navbar-feed",
        content: "This is your feed — updates from users you follow.",
      },
      {
        target: "#create-post-button",
        content: "Create posts to share progress on your goals and steps.",
      },
      {
        target: "#friend-suggestions",
        content: "Add friends to get inspired by their achievements.",
      },
    ],
  },
  {
    path: "/promises",
    steps: [
      {
        target: "#create-promise-button",
        content:
          "Create your first promise — define a goal and break it down into steps.",
      },
      {
        target: "#progress-bar",
        content: "Track the progress of each promise you make.",
      },
    ],
  },
  {
    path: "/friends",
    steps: [
      {
        target: "#navbar-friends",
        content:
          "Here you manage your subscriptions and friend requests — sent or received.",
      },
    ],
  },
  {
    path: "/profile",
    steps: [
      {
        target: "#achievements-panel",
        content:
          "View your badges earned for goal completions, social activity, and more.",
      },
      {
        target: "#promises-summary",
        content:
          "See all your promises and their progress in cards and charts.",
      },
    ],
  },
];
