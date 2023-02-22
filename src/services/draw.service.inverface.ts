export interface IDrawService {
    initSvg(width: number, height: number): void;

    drawLine(data: number[][], color?: string)
}
