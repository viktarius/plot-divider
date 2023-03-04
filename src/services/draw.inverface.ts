
export interface IPlot {
    width: number;
    height: number;
}

export interface IDrawService {
    initSvg(width: number, height: number): void;

    drawLine(data: number[][], context: any, option: Record<any, any>): void;

    drawSquare({ x1, y1, x2, y2 }, context: any, option: Record<any, any>): void;

    createGroup(gridName: string);

    toggleElementVisibility(element: string): void;
}
