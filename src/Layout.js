import { Navbar } from "./components/Navbar"
import { Outlet } from "react-router-dom"
export function Layout(){
    return(
        <>
        <Navbar/> {/*render navbar*/}
        <main>
            <Outlet/> {/*render all child routes this parent route is in*/}
        </main>
        </>
    )
}