"use client";

import { 
    useHistory, 
    useSelf , 
    useCanRedo, 
    useCanUndo,
    useMutation,
    useStorage,
    useOthersMapped
} from "@/liveblocks.config";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCallback, useMemo, useState } from "react";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
import { CursorPresence } from "./cursor-presence";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import {nanoid} from "nanoid"
import  {LiveObject}  from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

interface CanvasProps {
    boardId : string;
}

const MAX_LAYERS = 100;

export const Canvas = ({
    boardId
} : CanvasProps) => {

    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode : CanvasMode.None
    });

    const [camera , setCamera] = useState<Camera>({x:0, y :0});
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r : 0,
        g : 0,
        b : 0,
    })

    const history  = useHistory();
    const canRedo = useCanRedo();
    const canUndo = useCanUndo();

    const insertLayer = useMutation((
        {storage, setMyPresence},
        layerType : LayerType.Ellipse | LayerType.Note | LayerType.Text | LayerType.Rectangle,
        position : Point,
        ) => {
            const liveLayers = storage.get("layers");

            if(liveLayers.size >= MAX_LAYERS){
                return ;
            }
            
            const liveLayerIds = storage.get("layerIds");
            const layerId = nanoid();

            const layer = new LiveObject({
                type : layerType,
                x : position.x,
                y : position.y,
                width : 100,
                height : 100,
                fill : lastUsedColor,
            });

            liveLayerIds.push( layerId );
            liveLayers.set(layerId, layer);

            setMyPresence({selection : [layerId]} , {addToHistory : true});
            setCanvasState({mode :CanvasMode.None})
    } , [lastUsedColor])

    const onWheelMove = useCallback((e : React.WheelEvent) => {
        setCamera((camera) => ({
            x : camera.x - e.deltaX,
            y : camera.y - e.deltaY
        }))
    }, [])

    const onPointerMove = useMutation (({setMyPresence} , e : React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e,camera);
        setMyPresence({
            cursor : current
        })
    }, [])

    const onPointerLeave = useMutation (({setMyPresence} , e : React.PointerEvent) => {
        setMyPresence({
            cursor : null
        })
    }, [])

    const onPointerUp = useMutation (({} , e) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if(canvasState.mode === CanvasMode.Inserting){
            insertLayer(canvasState.LayerType, point);
        }else{
            setCanvasState({
                mode : CanvasMode.None
            })
        }

        history.resume();
    }, [camera , canvasState, history, insertLayer])

    const info = useSelf((me) => me.info);

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation((
        {self, setMyPresence},
        e : React.PointerEvent,
        layerId : string,
    ) => {
        if(canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting){
            return ;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);
        if(!self.presence.selection.includes(layerId)){
            setMyPresence({
                selection : [layerId]
            }, {addToHistory : true});
            setCanvasState({mode : CanvasMode.Translating , current : point})
        }
    } , [
        setCanvasState,
        history,
        canvasState.mode,
        camera,

    ])

    const layerIdsToColorSelection = useMemo(()=> {
        const layerIdsToColorSelection : Record<string, string> = {};
        for(const user of selections){
            const [connectionId, selection ] = user;

            for(const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
            }
        }

        return layerIdsToColorSelection;
    },[selections])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none"> 
            <Info boardID= {boardId} />
            <Participants />
            <Toolbar 
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            undo={history.undo}
            redo={history.redo}
            canRedo = {canRedo}
            canUndo = {canUndo}
            />

            <svg
            className="h-[100vh] w-[100vw]"
            onWheel = {onWheelMove}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            >
                <g
                style = {{
                    transform : `translate(${camera.x}px,${camera.y}px)`
                }}
                >   
                    {layerIds.map((layerId)=>{
                        return <LayerPreview 
                        key = {layerId} 
                        layerId = {layerId}
                        onLayerPointerDown = {onLayerPointerDown}
                        selectionColor = {layerIdsToColorSelection[layerId]}
                        />
                    })}
                    <SelectionBox 
                    onResizeHandlePointerDown = {()=>{}}
                    />
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}