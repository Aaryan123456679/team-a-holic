"use client";

import { Avatar } from "@/components/ui/avatar";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {

    const currentUser = useSelf();
    const users = useOthers();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0,MAX_SHOWN_USERS).map(({connectionId, info}) => {
                   return  <UserAvatar 
                   borderColor={connectionIdToColor(connectionId)}
                    key = {connectionId}
                    src = {info?.avatar}
                    name = {info?.name}
                    fallback = {info?.name?.[0] || "A"}
                    />
                })}
                {currentUser && <UserAvatar 
                borderColor={connectionIdToColor(currentUser.connectionId)}
                src = {currentUser?.info?.avatar}
                name = {`${currentUser?.info?.name}  (YOU)` }
                fallback = {currentUser?.info?.name?.[0]}
                />}
                {hasMoreUsers && (
                    <UserAvatar 
                    name = {`${users.length - MAX_SHOWN_USERS} more`}
                    fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    )
}

export const  ParticipantSkeleton = () => {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md w-[100px]" />
    )
}