
import AppsCollections from "views/AppsCollection/AppsCollections";
import Dashboard from "views/Dashboard/Dashboard";
import WidgetForm from "views/WidgetForm/WidgetForm";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/widget-form",
    name: "Widgets",
    icon: "tim-icons icon-puzzle-10",
    component: <WidgetForm />,
    layout: "/admin",
  },

  {
    path: "/apps-collection",
    name: "Apps",
    icon: "tim-icons icon-app",
    component: <AppsCollections />,
    layout: "/admin",
  }
];
export default routes;
