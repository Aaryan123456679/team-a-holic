import { Kalam } from "next/font/google";
import ContentEditable , {ContentEditableEvent} from "react-contenteditable";
import { cn, colorToCSS } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
})

interface TextProps{
    id : string;
    layer : TextLayer;
    onLayerPointerDown : (e : React.PointerEvent, id : string) => void;
    selectionColor ?: string;
}

const calculateFontSize = (width : number , height : number) => {
    const MAX_FONT_SIZE = 96;
    const SCALE_FACTOR  = 0.5;
    const fontSizeBasedOnHeight = height * SCALE_FACTOR;
    const fontSizeBasedOnWidth = width * SCALE_FACTOR;

    return Math.min(fontSizeBasedOnHeight , fontSizeBasedOnWidth, MAX_FONT_SIZE);
}

export const Text = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor,
} : TextProps) => {
    const { x, y, width, height, fill , value} = layer;

    const updateValue = useMutation(({storage} ,  newValue : string) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);
    }, [])

    const handleChangeEvent = (e : ContentEditableEvent) => {
        updateValue(e.target.value);
    }

    return (
        <foreignObject 
        className="drop-shadow-md"
        onPointerDown={(e) => onLayerPointerDown(e, id)}
        style = {{
            outline : selectionColor ? `1px solid ${selectionColor}` : 'none',
        }}
        x = {x}
        y = {y}
        width = {width}
        height = {height}
        >
        <ContentEditable 
            html={value  || 'Text'}
            onChange={handleChangeEvent}
            className= {cn(
                "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                font.className
            )}
            style={{
                fontSize : calculateFontSize(width , height),
                color : fill ? colorToCSS(fill) : "#000",
            }}
        />
        </foreignObject>
    )
}