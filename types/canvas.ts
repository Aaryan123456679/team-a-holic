export enum CanvasMode {
    None,
    Pressing,
    Resizing,
    SelectionNet,
    Translating,
    Inserting,
    Pencil
}

export type CanvasState  = {
    mode : CanvasMode.None;
} | {
    mode : CanvasMode.Pressing;
    origin : Point;
} | {
    mode : CanvasMode.Resizing;
    initialBounds : XYWH;
    corner : Side;
} | {
    mode : CanvasMode.SelectionNet;
    origin : Point;
    current ?: Point;
} | {
    mode : CanvasMode.Translating;
    current : Point;
} | {
    mode : CanvasMode.Inserting;
    LayerType : LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text
} | {
    mode : CanvasMode.Pencil;
}

export type Color = {
    r : number;
    g : number;
    b : number;
}

export type Camera  = {
    x : number;
    y : number;
}

export enum LayerType  {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note
}

export type RectangleLayer = {
    type : LayerType.Rectangle;
    x : number;
    y : number;
    width : number;
    height : number;
    fill : Color;
    value ?: string;
}

export type EllipseLayer = {
    type : LayerType.Ellipse;
    x : number;
    y : number;
    width : number;
    height : number;
    fill : Color;
    value ?: string;
}

export type PathLayer = {
    type : LayerType.Path;
    x : number;
    y : number;
    width : number;
    height : number;
    fill : Color;
    points : number[][];
    value ?: string;
}

export type TextLayer = {
    type : LayerType.Text;
    x : number;
    y : number;
    width : number;
    height : number;
    fill : Color;
    value ?: string;
}

export type NoteLayer = {
    type : LayerType.Note;
    x : number;
    y : number;
    width : number;
    height : number;
    fill : Color;
    value ?: string;
}

export type Point = {
    x : number;
    y : number;
}

export type XYWH = {
    x : number;
    y : number;
    width : number;
    height : number;
}

export enum Side {
    Left = 1,
    Right = 1,
    Top = 4,
    Bottom = 8
}

export type Layer = RectangleLayer | PathLayer | TextLayer | NoteLayer | EllipseLayer