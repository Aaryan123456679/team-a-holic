"use client";

import { Hint } from "@/app/(dashboard)/_components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRenameModel } from "@/store/use-modal-rename";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardID: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const TabSeparator = ({props} : any) => {
  return <div className="text-neutral-300 px-1.5" {...props}>|</div>;
};

export const Info = ({ boardID }: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardID as Id<"boards">,
  });
  const { onOpen } = useRenameModel();

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute left-2 top-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md gap-x-3">
      <Hint label="Go to Boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Change Title" side="bottom" sideOffset={10} >
        <Button
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
          variant = "ghost"
        >
          {data.title}
        </Button>
      </Hint>

      {/*<TabSeparator style = {{display : "none"}}/>*/}
      <TabSeparator />
      <div className=" ml-7">
      <Actions id = {data._id} title = {data.title} side= 'bottom' sideOffset={10}>
            <div className="gap-x-2">
                <Hint label ="Menu" side="bottom" sideOffset={10}>
                    <Button size= 'icon' variant = 'board'>
                        <Menu />
                    </Button>
                </Hint>
            </div>
      </Actions>
      </div>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute left-2 top-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
