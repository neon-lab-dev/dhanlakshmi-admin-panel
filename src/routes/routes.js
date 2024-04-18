import { lazy } from "react";

//   path: string // Path of the route
//   component: LazyExoticComponent<() => JSX.Element> // Component to render -> lazy import with async await

const ROUTES = [
  {
    path: "",
    component: lazy(async () => await import("../pages/Home/index")),
  },
  {
    path: "dashboard",
    component: lazy(async () => await import("../pages/Home/index")),
  },
  {
    path: "Products",
    component: lazy(async () => await import("../pages/Product/index")),
  },
  {
    path: "add-users",
    component: lazy(async () => await import("../pages/Product/CreateDoctor")),
  },
  {
    path: "seller",
    component: lazy(async () => await import("../pages/Seller/index")),
  },
  {
    path: "users",
    component: lazy(async () => await import("../pages/Users/index")),
  },
  {
    path: "login",
    component: lazy(async () => await import("../pages/Login/index")),
  },
  {
    path: "*",
    component: lazy(async () => await import("../pages/Error/404")),
  },
];
export default ROUTES;
