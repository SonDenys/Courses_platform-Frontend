import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import RootPage from "../RootPage";
// import MainApp from "../MainApp";
import Page404 from "../Page404";
import Login from "../Login";
import MainApp from "../MainApp";
import Dummy from "../Dummy";

import AdminDashboard from "../AdminDashboard";
import UserDashboard from "../UserDashboard";
import AdminHome from "../AdminDashboard/AdminHome";

// import { PrepareRoute } from "./utils";
// import Login from "../Login";
// import RootPage from "../RootPage";
// import ProductFeatures from "../ProductFeatures";

// import PaymentPage from "../PaymentPage";
// import SuccessPaymentPage from "../PaymentPage/SuccessPaymentPage";
// import FailedPaymentPage from "../PaymentPage/FailedPaymentPage";

// const LandingPage = lazy(() => import("../LandingPage"));
const Home = lazy(() => import("../Home"));
// const Home_v2 = lazy(() => import("../Home_v2"));
// // const Login = lazy(() => import("../Login"))
// const Signup = lazy(() => import("../Signup"));
// // const Profile = lazy(() => import("../Profile"))
// const Products = lazy(() => import("../Products"));
// const Price = lazy(() => import("../Price"));
// const TeamsCopy = lazy(() => import("../TeamsCopy"));
// const ReadyToDownloadFile = lazy(() => import("../ReadyToDownloadFile"));
// const ListDownloadFilesSent = lazy(() => import("../ListDownloadFilesSent"));
// const InvitedPageLogin = lazy(() => import("../InvitedPageLogin"));
// const InvitedPageSignup = lazy(() => import("../InvitedPageSignup"));
// const PaymentPage = lazy(() => import("../PaymentPage/BasicPayment"));
// const BasicPaymentPage = lazy(
//   () => import("../PaymentPage/BasicPayment/index")
// );
// const PremiumPaymentPage = lazy(
//   () => import("../PaymentPage/PremiumPayment/index")
// );

export interface AppRouterObject extends RouteObject {
  protected?: boolean;
}

var ROUTES: AppRouterObject[] = [];

export function getRoutes(): AppRouterObject[] {
  if (ROUTES.length) {
    return ROUTES;
  }

  // return [];
  ROUTES = [
    { // Open to all Users
      path: "/",
      element: <RootPage />,
      protected: false,
      children: [
        // {
        //   path: "",
        //   element: <LandingPage />,
        // },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dummy",
          element: <Dummy />,
        },

        // {
        //   path: "signup",
        //   element: <Signup />,
        // },
        // {
        //   path: "products",
        //   element: <Products />,
        // },
        // {
        //   path: "price",
        //   element: <Price />,
        // },
        // {
        //   path: "v1.0/api/activate",
        //   element: <InvitedPageLogin />,
        // },
        // {
        //   path: "invited_signup",
        //   element: <InvitedPageSignup />,
        // },
        // {
        //   path: "product_features",
        //   element: (
        //     <ProductFeatures
        //       title1="Everything you need to talk with your customers"
        //       title2="Full-Featured"
        //     />
        //   ),
        // },
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      protected: false,
      children: [
        {
          path: "home/:id",
          element: <AdminHome />,
        }
      ]
    },    
    {
      path: "/user",
      element: <UserDashboard />,
      protected: false,
      children: []
    },

    { // Authenticated users only
      path: "app",
      element: <MainApp />,
      protected: true,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        // {
        //   path: "teams",
        //   element: <TeamsCopy />,
        // },

        // {
        //   path: "download_file",
        //   element: <ReadyToDownloadFile />,
        // },
        // {
        //   path: "download_file_sent",
        //   element: <ListDownloadFilesSent />,
        // },
        // {
        //   path: "payment",
        //   element: <PaymentPage />
        // },
        // {
        //   path: "success_payment",
        //   element: <SuccessPaymentPage />,
        // },
        // {
        //   path: "failed_payment",
        //   element: <FailedPaymentPage />,
        // },
      ],
    },
    // {
    //   path: "/home",
    //   element: <Home/>,
    //   protected: true,
    //   children: []
    // },
    // {
    //   path: "/products",
    //   element: <Products />,
    //   protected: true,
    //   children: [],
    // },
    // {
    //   path: "/price",
    //   element: <Price />,
    //   protected: true,
    //   children: [],
    // },
    // {
    //   path: "/signup",
    //   element:  <Signup/>,
    //   protected: false,
    //   children: [],
    // },
    // {
    //   path: "/teams",
    //   element: <TeamsCopy/>,
    //   protected: true,
    //   children: [],
    // },
    // {
    //   path: "/download_file",
    //   element: <Navigate to="/app/download_file" />,
    // },
    // {
    //   path: "/download_file_sent",
    //   element: <Navigate to="/app/download_file_sent" />,
    // },
    // {
    //   path: "/v1.0/api/activate",
    //   element: <InvitedPageLogin />,
    //   protected: false,
    //   children: [],
    // },
    // {
    //   path: "/invited_signup",
    //   element: <InvitedPageSignup />,
    //   protected: false,
    //   children: [],
    // },
    {
      path: "/page_404",
      element: <Page404 />,
      protected: false,
      children: [],
    },
    {
      path: "*",
      element: <Navigate replace to={"/page_404"} />,
      protected: false,
      children: [],
    },
  ];

  return ROUTES;
}

