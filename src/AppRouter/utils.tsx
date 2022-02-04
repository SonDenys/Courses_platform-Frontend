import { Suspense } from "react"
import { Navigate, Route, useLocation } from "react-router-dom"
import { isAuthenticated } from "../Auth"
import { AppRouterObject } from "./route_config"
// import Spinner from "../../components/spinner";
// import Spinner from "../../components/Spinner"




function isAuth() {
    return isAuthenticated()
}


export function RouteWrapper({ children, ...rest }) {
    return (
        <>
            <Suspense fallback>
                {children}
            </Suspense>
        </>)
}

export function PrepareRoute({ isProtected = true, children, ...rest }) {
    const location = useLocation();

    if (isProtected === true) {
        if (!isAuth()) {
            if (location.pathname !== "/login") {
                return <Navigate replace to="/login" />
            }
        }
    }

    if (location.pathname === "/login") {
        if (isAuth()) {
            return <Navigate replace to="/app/home" />
        }
    }


    return (
        <>
            <RouteWrapper>
                {children}
            </RouteWrapper>

        </>)
}




export function RouteRenderer({ routes }) {
    return (routes as AppRouterObject[]).map((route, index) => {
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
                            </RouteWrapper>
                        } />)

                })
                }
            </Route>
        )
    })
}


