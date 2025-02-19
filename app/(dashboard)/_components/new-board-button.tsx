"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId : string;
    disabled ?: boolean;
}

export const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {

    const router = useRouter();
    const {pending, mutate} = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        }).then((id) => {
            toast.success("Board Created")
            router.push(`/board/${id}`)
        }).catch((error) => {
            toast.error("Board Not Created");
        })
    } 
    return (
        <button
        disabled = {disabled || pending}
        onClick = {onClick}
        className = {cn(
            "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
            (disabled||pending) && "opacity-75 cursor-not-allowed hover:bg-blue-600"
        )}
        >
            <div />
            <Plus 
            className="h-12 w-12 text-white stoke-1 "
            />
            <p className="text-sm text-white font-light">
                New Board
            </p>
        </button>
    )
}