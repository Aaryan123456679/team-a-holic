"use client";

import { useStorage } from "@/liveblocks.config";
import { Color, LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
    layerId : string;
    onLayerPointerDown : (e : React.PointerEvent , id : string) => void;
    selectionColor ?: string;
}

export const LayerPreview = memo(({
    layerId,
    onLayerPointerDown,
    selectionColor,
} : LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(layerId));

    if(!layer) return null;



    switch (layer.type){
        case LayerType.Rectangle:
            return (
                <Rectangle 
                id = {layerId}
                onLayerPointerDown={onLayerPointerDown}
                layer={layer}
                selectionColor={selectionColor}
                />
            )
        case LayerType.Ellipse:
            return (
                <div>
                    Rectangle
                </div>
            )
        case LayerType.Text:
            return (
                <div>
                    Text
                </div>
            )
        case LayerType.Note:
            return (
                <div>
                    Note
                </div>
            )
        default:
            return null
    }
});

LayerPreview.displayName = "LayerPreview"