export interface IDrawService {
    initSvg(width: number, height: number): void;

    drawLine(data: number[][], color?: string): void;

    drawSquare({x1, y1, x2, y2}, color?: string): void;
}
