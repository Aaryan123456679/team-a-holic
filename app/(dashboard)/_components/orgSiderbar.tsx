"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    weight: "600",
    subsets: ["latin"],
});

export const OrgSidebar = ({ }) => {

    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className=" flex items-center gap-x-2">
                    <Image src="/logo.svg" alt="LOGO" height={20} width={20} />
                    <span className={cn("font-semibold text-2-xl", font.className)}>
                        TEAM-A-HOLIC
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher 
            hidePersonal
            appearance={{
                elements : {
                    rootBox: {
                        display : "flex",
                        justifyContent:"center",
                        alignItems : "center",
                        width : "100%",
                    },
                    organizationSwitcherTrigger : {
                        padding : "6px",
                        width : "100%",
                        borderRadius: "8px",
                        border : "1px solid #E5E7EB",
                        justifyContent : "space-between",
                        backgroundColor : "white",
                    }
                }
            }}
            />
            <div className=" space-y-1 w-full ">
                <Button
                asChild
                size='lg'
                className=" font-normal justify-start w-full px-2"
                variant= {favorites ? "ghost" : "secondary"}
                >
                    <Link href = "/">
                        <LayoutDashboard className=" h-4 w-4 mr-2"/>
                        Team Boards
                    </Link>
                </Button>
                <Button
                asChild
                size='lg'
                className=" font-normal justify-start w-full px-2"
                variant={favorites ? "secondary" : "ghost"}
                >
                    <Link href = {{
                        pathname : "/",
                        query : {favorites : true}
                    }}>
                        <Star className=" h-4 w-4 mr-2"/>
                        Favorite Boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};
