import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import RootPage from "../pages/RootPage";
// import MainApp from "../MainApp";
import Page404 from "../pages/Page404";
import MainApp from "../pages/MainApp";
import Dummy from "../pages/Dummy";

import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import AdminHome from "../pages/AdminDashboard/AdminHome";
import UserHome from "../pages/UserDashboard/UserHome";
import ActiveCoursePage from "../pages/AdminDashboard/ActiveCoursePage";
import EditActiveCoursePage from "../pages/AdminDashboard/ActiveSectionPage";
import StudentsPage from "../pages/AdminDashboard/StudentsPage";
import CreateStudentsPage from "../pages/AdminDashboard/StudentsPage/CreateStudentsPage";
import ChapterPage from "../pages/AdminDashboard/ChapterPage";
import CreateCoursePage from "../pages/AdminDashboard/CreateCoursePage";

import AdminLogin from "../pages/AdminDashboard/AdminLogin/index";
import AdminSignup from "../pages/AdminDashboard/AdminSignup";
import CreateChapterPage from "../pages/AdminDashboard/CreateChapterPage";
import CreateSectionPage from "../pages/AdminDashboard/CreateSectionPage";
import CreateSubsectionPage from "../pages/AdminDashboard/CreateSubsectionPage";
import EditCoursePage from "../pages/AdminDashboard/EditCoursePage";
import EditChapterPage from "../pages/AdminDashboard/EditChapterPage";
import EditSectionPage from "../pages/AdminDashboard/EditSectionPage";
import AdminSettings from "../pages/AdminDashboard/AdminSettings";
import EditSubSectionPageTest from "../pages/AdminDashboard/SubSectionPage/EditSubSectionPageTest";
import OrganizationsPage from "../pages/AdminDashboard/OrganizationsPage";
import OrganizationsOfCoursePage from "../pages/AdminDashboard/OrganizationsOfCoursePage";
import StudentsOrganizationsPage from "../pages/AdminDashboard/StudentsOrganizationsPage";
import StudentsListPage from "../pages/UserDashboard/StudentsListPage";
import CreateOrganizationPage from "../pages/UserDashboard/StudentsListPage/CreateOrganizationPage";

// const LandingPage = lazy(() => import("../LandingPage"));
const Home = lazy(() => import("../pages/Home"));
const CoursePage = lazy(() => import("../pages/AdminDashboard/CoursePage"));
const SectionPage = lazy(() => import("../pages/AdminDashboard/SectionPage"));
const SubSectionPage = lazy(
  () => import("../pages/AdminDashboard/SubSectionPage")
);
const EditSubSectionPage = lazy(
  () => import("../pages/AdminDashboard/SubSectionPage/EditSubSectionPage")
);

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
    {
      // Open to all Users
      path: "/",
      element: <RootPage />,
      protected: false,
      children: [
        // {
        //   path: "",
        //   element: <LandingPage />,
        // },
        {
          path: "",
          element: <AdminLogin />,
        },
        { path: "adminsignup", element: <AdminSignup /> },
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
        },
        {
          path: "home",
          element: <AdminHome />,
        },

        {
          path: "courses",
          element: <CoursePage />,
        },
        { path: "courses/createcourse", element: <CreateCoursePage /> },
        { path: "courses/courseedit/:course_id", element: <EditCoursePage /> },
        {
          path: "courses/chapters/:course_id",
          element: <ChapterPage />,
        },
        {
          path: "courses/chapters/createchapter/:course_id",
          element: <CreateChapterPage />,
        },
        {
          path: "courses/chapters/chapteredit/:course_id/:chapter_id",
          element: <EditChapterPage />,
        },
        {
          path: "courses/chapters/sections/:course_id/:chapter_id",
          element: <SectionPage />,
        },
        {
          path: "courses/chapters/sections/createsection/:course_id/:chapter_id",
          element: <CreateSectionPage />,
        },

        {
          path: "courses/chapters/sections/sectionedit/:course_id/:chapter_id/:section_id",
          element: <EditSectionPage />,
        },

        {
          path: "courses/chapters/sections/subsections/:course_id/:chapter_id/:section_id",
          element: <SubSectionPage />,
        },

        {
          path: "courses/chapters/sections/subsections/createsubsection/:course_id/:chapter_id/:section_id",
          element: <CreateSubsectionPage />,
        },

        // {
        //   path: "courses/chapters/sections/subsections/edit/:course_id/:chapter_id/:section_id/:subsection_id",
        //   element: <EditSubSectionPage />,
        // },
        {
          path: "courses/chapters/sections/subsections/edit/:course_id/:chapter_id/:section_id/:subsection_id",
          element: <EditSubSectionPageTest />,
        },
        { path: "active_courses", element: <ActiveCoursePage /> },
        { path: "active_courses/edit", element: <EditActiveCoursePage /> },
        {
          path: "organizations",
          element: <OrganizationsPage />,
        },

        {
          path: "organizations/organizations_of_course/:course_id",
          element: <OrganizationsOfCoursePage />,
        },

        { path: "students", element: <StudentsPage /> },
        {
          path: "students/students_organizations/:course_id",
          element: <StudentsOrganizationsPage />,
        },
        {
          path: "students/students_organizations/students_list/:course_id/:organization_id",
          element: <StudentsListPage />,
        },
        {
          path: "students/students_organizations/students_list/createstudent/:course_id/:organization_id",
          element: <CreateStudentsPage />,
        },
        { path: "settings", element: <AdminSettings /> },
        { path: "settings/:id", element: <AdminSettings /> },
      ],
    },

    {
      path: "/user",
      element: <UserDashboard />,
      protected: false,
      children: [
        {
          path: "home/:id",
          element: <UserHome />,
        },
        { path: "students", element: <StudentsListPage /> },
        {
          path: "students/createorganization",
          element: <CreateOrganizationPage />,
        },
      ],
    },

    {
      // Authenticated users only
      path: "app",
      element: <MainApp />,
      protected: true,
      children: [
        {
          path: "home",
          element: <Home />,
        },
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
