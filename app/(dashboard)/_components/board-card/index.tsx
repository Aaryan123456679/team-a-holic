"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id : string;
    title : string;
    imageUrl : string;
    authorId : string;
    authorName : string;
    createdAt : number;
    orgId : string;
    isFavorite : boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite,
} : BoardCardProps) => {

    const {userId} = useAuth();

    const authorLabel = userId === id ? "YOU" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix : true
    });

    const {
        pending : pendingFav,
        mutate : mutateFav
    } = useApiMutation(api.board.favorite);
    const {
        pending : pendingUnFav,
        mutate : mutateUnFav
    } = useApiMutation(api.board.unFavorite);

    const ToggleFav = () => {
        if(isFavorite){
            mutateUnFav({id})
            .catch(()=> toast.error("Failed to unFavorite"))
        }else{
            mutateFav({id,orgId})
            .catch(()=> toast.error("Failed to Favorite"))
        }
    }

    return (

        <Link href = {`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative bg-amber-50 flex-1">
                    <Image 
                    src = {imageUrl}
                    alt = {title}
                    fill
                    className="object-fit"
                    />
                    <Actions 
                    id = {id}
                    title = {title}
                    side = "right"
                    >
                        <button
                        className="absolute top-1 right-1 opacity-75 group-hover:opacity-100 transition-opacity px-2 py-3 outline-none"
                        >
                            <MoreHorizontal 
                            className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                    <Overlay />
                </div>
                <Footer 
                isFavorite = {isFavorite}
                title = {title}
                authorLabel = {authorLabel}
                createdAtLabel = {createdAtLabel}
                onClick = {ToggleFav}
                disabled = {pendingFav || pendingUnFav}
                />
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton(){
    return (
        <div className=" aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}