import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "../../Admin/View/AdminDashboard/Dashboard";
import AuditTrail from "../View/AuditTrail/AuditTrail";
import UserTable from "../View/UserTable/UserTable";



const dashboardRoutes = [
  {
    path: "/admin",
    sidebarName: "Dashboard",
    navbarName: "Voucherz Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
 
  {
    path: "/audittrail",
    sidebarName: "Audit Trail",
    navbarName: "Audit Trail",
    icon: "content_paste",
    component:AuditTrail
  },
  {
    path: "/user",
    sidebarName: "User Table",
    navbarName: "User Table",
    icon: "person",
    component:UserTable
  },

  
  
   { redirect: true, path: "/", to: "/admin", navbarName: "Redirect" }
];

export default dashboardRoutes;
