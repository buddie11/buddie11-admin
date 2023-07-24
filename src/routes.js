// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Series from "layouts/series";
import Teams from "layouts/teams";
import Matches from "layouts/matches";
import Contest from "layouts/contest";
import Players from "layouts/players";
import FantasyPoints from "layouts/fantasy-points";
// @mui icons
import Icon from "@mui/material/Icon";
// Series
// - Teams
// - Matches
// - Players
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Series",
    key: "series",
    icon: <Icon fontSize="small">sports_cricket</Icon>,
    route: "/series",
    component: <Series />,
  },
  {
    type: "collapse",
    name: "Team",
    key: "teams",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/teams",
    component: <Teams />,
  },
  {
    type: "collapse",
    name: "Matches",
    key: "matches",
    icon: <Icon fontSize="small">sports_soccer</Icon>,
    route: "/matches",
    component: <Matches />,
  },
  {
    type: "collapse",
    name: "Player",
    key: "players",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/players",
    component: <Players />,
  },
  {
    type: "collapse",
    name: "Contest",
    key: "contest",
    icon: <Icon fontSize="small">emoji_events</Icon>,
    route: "/contest",
    component: <Contest />,
  },
  {
    type: "collapse",
    name: "Fantasy Points",
    key: "fantasyPoints",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/fantasyPoints",
    component: <FantasyPoints />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
