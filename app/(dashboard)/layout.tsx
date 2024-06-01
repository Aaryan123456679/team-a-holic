import { Navbar } from "./_components/nav-bar";
import { OrgSidebar } from "./_components/orgSiderbar";
import { SideBar } from "./_components/sidebar";

interface DashBoardLayoutProps {
    children : React.ReactNode;
}

const  DashBoardLayout = ({
    children
} : DashBoardLayoutProps) => {
    return (
        <main className="h-full">
            <SideBar />
            <div className="pl-[60px] h-full">
                <div className="flex h-full gap-x-3">
                    <OrgSidebar/>
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashBoardLayout;