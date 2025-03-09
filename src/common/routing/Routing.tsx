import { Main } from "@/app/Main"
import { Navigate, Route, Routes } from "react-router"
import { Login } from "@/features/todolists/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "/404",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    {/*<Route path={Path.NotFound} element={<PageNotFound />} />*/}
    <Route path={Path.NotFound} element={<PageNotFound />} />
    <Route path={"/*"} element={<Navigate to={Path.NotFound} />} />
  </Routes>
)
