"use client";

import { memo } from "react";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

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
const Drafts = () => {
    const ids = useOthersMapped((other) => ({
        pencilDraft : other.presence.pencilDraft,
        pencilColor : other.presence.pencilColor
    }), shallow);
    return (
        <>
            {ids.map(([key,other])=> {
                if(other.pencilDraft){
                    return(
                        <Path 
                            key={key}
                            points = {other.pencilDraft}
                            fill = {other.pencilColor ? colorToCSS(other.pencilColor) : "#000"}
                            x = {0}
                            y = {0}
                        />
                    )
                }
            })}
        </>
    )
}

export const CursorPresence = memo(() => {
    return (
        <>
            <Cursors />
            <Drafts />
        </>
    )
})

CursorPresence.displayName = "Cursor Presence";