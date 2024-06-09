import getStroke from "perfect-freehand";
import { cn, colorToCSS, getSvgPathFromStroke } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

interface PathProps{
    id ?: string;
    x : number;
    y : number;
    points : number[][];
    fill : string;
    onLayerPointerDown ?: (e : React.PointerEvent) => void;
    stroke ?: string;
}

export const Path = ({
    x,
    y,
    points,
    fill,
    onLayerPointerDown,
    stroke,
} : PathProps) => {
    return (
        <path 
        className="drop-shadow-md"
        onPointerDown={onLayerPointerDown}
        d = {getSvgPathFromStroke(getStroke(points, {size : 16, thinning : 0.5 , smoothing : 0.5 , streamline : 0.5}))}
        style = {{
            transform : `translate(${x}px,${y}px)`
        }}
        fill = {fill}
        stroke = {stroke}
        strokeWidth = {1}
        x = {0}
        y = {0}
        />
    )
}