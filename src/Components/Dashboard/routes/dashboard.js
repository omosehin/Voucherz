import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "../View/Dashboard/Dashboard";
import TableList from "../View/TableList/TableList";
import Vourcher from "../View/Vourcher/Voucher";
import CreateBulkVoucherDashBoard from '../View/Vourcher/CreateVoucher/Bulk/CreateBulkVoucherDashboard/CreateBulkVoucherDashboard'
import CreateSingleVoucherDashboard from '../View/Vourcher/CreateVoucher/Standalone/CreateSingleVoucherDashboard/CreateSingleVoucherDashboard'
import Redemption from "../View/Redemption/index";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Voucherz Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  
  {
    path: "/voucher",
    sidebarName: "Vourcher",
    navbarName: "Voucher",
    icon: Person,
    component: Vourcher
  },
  
  {
    path: "/redemption",
    sidebarName: "Redemption",
    navbarName: "Redemption",
    icon: Person,
    component: Redemption
  },
  {
    path: "/table",
    sidebarName: "Vourcher Table",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },

  {
    path: "/Bulk",
    sidebarName: "Create Bulk Voucher",
    navbarName: "",
    icon: "",
    component: CreateBulkVoucherDashBoard
  },

  {
    path: "/Standalone",
    sidebarName: "Create Single Voucher",
    navbarName: "",
    icon: "",
    component:CreateSingleVoucherDashboard
  },
  
   { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
