"use client";

import { useStorage } from "@/liveblocks.config";
import { Color, LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

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
        case LayerType.Path:
            return (
                <Path
                    key = {layerId}
                    id = {layerId}
                    points = {layer.points}
                    x = {layer.x}
                    y = {layer.y}
                    fill = {layer.fill ? colorToCSS(layer.fill) : "#000"}
                    onLayerPointerDown={(e) => onLayerPointerDown(e,layerId)}
                    stroke={selectionColor}
                />
            )
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
                <Ellipse
                    id = {layerId}
                    onLayerPointerDown={onLayerPointerDown}
                    layer={layer}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return (
                <Text
                    id = {layerId}
                    onLayerPointerDown={onLayerPointerDown}
                    layer={layer}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Note:
            return (
                <Note
                id = {layerId}
                onLayerPointerDown={onLayerPointerDown}
                layer={layer}
                selectionColor={selectionColor}
            />
            )
        default:
            return null
    }
});

LayerPreview.displayName = "LayerPreview"