"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {

    const router = useRouter();

    const {organization} = useOrganization();
    const {pending, mutate} = useApiMutation(api.board.create);

    if(!organization) {return;}

    const onClick = () => {
        mutate({
            orgId : organization?.id,
            title  :"UNTITLED",

        }).then((id) => {
            toast.success("Board Created");
            router.push(`/board/${id}`)
        }).catch((error) => {
            toast.error("Failed to create board");
        })
    }

    return ( <div className="h-full flex flex-col justify-center items-center">
        <Image 
        src = '/no_board.svg'
        alt = "NO BOARDS FOUND"
        height={110}
        width={110}
        />
        <h2 className="font-semibold text-2xl mt-6">
            Create your first Board !
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
            Start by creating a board for your organization.
        </p>
        <div className="mt-6">
            <Button disabled = {pending} size='lg' onClick={onClick}>
                Create Board
            </Button>
        </div>
    </div> )
}