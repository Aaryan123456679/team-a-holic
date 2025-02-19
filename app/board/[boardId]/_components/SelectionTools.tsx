"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/app/(dashboard)/_components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolProps {
    setLastUsedColor : (color : Color) => void;
    camera : Camera
}

export const SelectionTool = memo(({
    setLastUsedColor,
    camera,
} : SelectionToolProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const deleteLayers = useDeleteLayers();

    const moveToBack = useMutation((
        {storage},
    ) => {
        const liveLayersIds = storage.get("layerIds");
        const indices : number[] = [];
        const arr = liveLayersIds.toImmutable();

        for(let i = 0; i < arr.length ; i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }
        for(let i = 0; i < indices.length ; i++){
            liveLayersIds.move(indices[i],i);
        }
    },[selection]);

    const moveToFront = useMutation((
        {storage},
    ) => {
        const liveLayersIds = storage.get("layerIds");
        const indices : number[] = [];
        const arr = liveLayersIds.toImmutable();

        for(let i = 0; i < arr.length ; i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }
        for(let i = indices.length - 1; i >= 0 ; i--){
            liveLayersIds.move(indices[i],arr.length - 1 - (indices.length-i-1));
        }
    },[selection]);

    const setFill = useMutation((
        {storage},
        fill : Color
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })

    },[setLastUsedColor, selection])

    const selectionBounds = useSelectionBounds();

    if(!selectionBounds) return null;

    const x = selectionBounds.width/2  + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div
        className="absolute p-3 bg-white rounded-xl shadow-sm border flex select-none"
        style = {{
            transform : `translate(calc(${x}px - 50%), calc(${y - 16}px - 100% ))`
        }}
        >
            <ColorPicker 
                onChange = {setFill}
            />
            <div
                className="flex flex-col gap-y-0.5"
            >
                <Hint
                    label = "Bring to front"
                >
                    <Button 
                        variant='board'
                        size='icon'
                        onClick = {moveToFront}
                    >
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint
                    label = "Send to Back"
                >
                    <Button 
                        variant='board'
                        size='icon'
                        onClick = {moveToBack}
                    >
                        <SendToBack />
                    </Button>
                </Hint>
            </div>
            <div
            className="flex items-center pl-2 ml-2 border-l border-neutral-200"
            >
                <Hint
                label = "Delete"
                >
                    <Button variant='board' size='icon' onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

SelectionTool.displayName = "SelectionTool"