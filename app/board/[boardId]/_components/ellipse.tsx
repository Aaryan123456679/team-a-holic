import { colorToCSS } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps{
    id : string;
    layer : EllipseLayer;
    onLayerPointerDown : (e : React.PointerEvent, id : string) => void;
    selectionColor ?: string;
}

export const Ellipse = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor,
} : EllipseProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <ellipse 
        className="drop-shadow-md"
        onPointerDown={(e) => onLayerPointerDown(e, id)}
        style = {{
            transform : `translate(${x}px,${y}px)`
        }}
        cx = {width/2}
        cy = {height/2}
        rx = {width/2}
        ry = {height/2}
        strokeWidth={1}
        fill = {fill ? colorToCSS(fill) : "#000"}
        stroke = {selectionColor || 'transparent'}
        />
    )
}