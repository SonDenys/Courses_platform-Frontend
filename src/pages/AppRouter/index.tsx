
import { lazy, Suspense, useEffect, useState } from "react";
import { render } from "react-dom";
import { Navigate, Outlet, Route, RouteObject, Routes, useRoutes } from "react-router-dom";
import { isAuthenticated } from "../../Auth";
// import Header from "../../components/Header";
// import Home2 from "../Home2";
// import Page404 from "../Page404";
import { AppRouterObject, getRoutes } from "./route_config";
import { PrepareRoute, RouteRenderer, RouteWrapper } from "./utils";


export default function AppRouter() {

    const [routes, setRoutes] = useState<AppRouterObject[]>([]);
    const r = getRoutes();

    useEffect(() => {
        setRoutes(r);
    }, [r])

    return (
        <>
            <Routes>
                {routes.map((route, index) => {
                    return (
                        <Route key={index} path={route.path} element={
                            <PrepareRoute isProtected={route.protected}>
                                {route.element}
                            </PrepareRoute>
                        } >
                            {route.children?.map((child, index) => {
                                const elem: any = child.element;
                                return (
                                    <Route key={`ch${index}`} path={child.path} element={
                                        <RouteWrapper>
                                            {elem}
                                        </RouteWrapper> }>
                                        {child.children?.map((child, index) => {
                                            const elem: any = child.element;
                                            return (
                                                <Route key={`ch2${index}`} path={child.path} element={
                                                    <RouteWrapper>
                                                        {elem}
                                                    </RouteWrapper> } >
                                                </Route>
                                            )
                                        })
                                        }
                                    </Route>
                                )
                            })
                            }
                        </Route>
                    )
                })
                }
            </Routes>
        </>
    )

}


