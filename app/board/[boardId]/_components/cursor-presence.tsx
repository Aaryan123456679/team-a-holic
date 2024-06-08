"use client";

import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
        <>
            {ids.map((cursor)=> (
                <Cursor 
                key = {cursor}
                connectionId = {cursor}
                />
            ))}
        </>
    )
}

export const CursorPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    )
})

CursorPresence.displayName = "Cursor Presence";