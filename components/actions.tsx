"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModel } from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-modal-rename";
import { useState } from "react";

interface ActionProps{
    children : React.ReactNode;
    side ?: DropdownMenuContentProps["side"];
    sideOffset ?: DropdownMenuContentProps["sideOffset"];
    id : string;
    title:string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
} : ActionProps) => {

    const {mutate, pending} = useApiMutation(api.board.remove);
    const {onOpen} = useRenameModel();


    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        .then(() => toast.success("Link Copied"))
        .catch(()=> toast.error("Failed to Copy Link"))
    }

    const onDelete = () => {
        mutate({id})
        .then(() => toast.success("Board Deleted"))
        .catch(()=> toast.error("Failed to delete Board"))            
        }
    

    return (
        <div className="absolute z-50 top-1 right-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                onClick={(e)=>e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                >
                    <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={copyLink}
                    >
                        <Link2 className="h-4 w-4 mr-2"/>
                        Copy Board Link 
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={() => onOpen(id,title)}
                    >
                        <Pencil className="h-4 w-4 mr-2"/>
                        Rename 
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ConfirmModel
                    header="Delete Board ?"
                    description="This will delete your boards and all of it's contents."
                    disable = {pending}
                    onConfirm={onDelete}
                    >
                    <Button
                    variant="ghost"
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete Board
                    </Button>
                    </ConfirmModel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}