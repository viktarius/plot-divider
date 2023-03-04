import { injectable } from "inversify";
import { select } from 'd3-selection';

import { IDrawService } from "./draw.inverface";
import { line, scaleLinear } from "d3";
import { ScaleLinear } from "d3-scale";
import { Line } from "d3-shape";
import { isNil } from "../core/utils/core-util";

@injectable()
export class DrawService implements IDrawService {
    private svg: any;
    private x: ScaleLinear<number, number>;
    private y: ScaleLinear<number, number>;
    private lineFn: Line<[number, number]>;
    private layerState: Record<string, boolean> = {}

    constructor() {
    }

    public initSvg(width: number, height: number): void {
        const svgMargin = 20;
        const svgWidth = 1000;
        const svgHeight = 380;

        this.x = scaleLinear()
            .domain([0, width])
            .range([0, svgWidth]);

        this.y = scaleLinear()
            .domain([0, height])
            .range([svgHeight, 0]);

        this.lineFn = line()
            .x(([width, height]) => this.x(width))
            .y(([width, height]) => this.y(height))

        this.svg = select('#plot-divider-visualization')
            .append('svg')
            .attr('width', svgWidth + svgMargin + svgMargin)
            .attr('height', svgHeight + svgMargin + svgMargin)
            .append('g')
            .attr('transform', 'translate(' + svgMargin + ', ' + svgMargin + ')');
    }

    public drawLine(data: number[][], color: string = 'black'): void {
        this.svg
            .append('path')
            .attr('d', this.lineFn(data))
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1);
    }

    public drawSquare(data: { x1, y1, x2, y2 }, context: any = this.svg, option: Record<any, any>): void {
        context
            .append('rect')
            .attr('x', () => this.x(data.x1))
            .attr('y', () => this.y(data.y1))
            .attr('width', () => this.x(data.x2))
            .attr('height', () => this.y(data.y2))
            .style('stroke', "#000000")
            .style('fill', option.color);
    }

    public drawGrid(gridName: string) {
        return this.svg.append('g').classed(gridName, true);
    }

    public toggleElementVisibility(element: string): void {
        const visibility = this.layerState[element] = !isNil(this.layerState[element])
            ? !this.layerState[element]
            : false;
        this.svg.select(element).style('visibility', visibility ? 'visible' : 'hidden');
        this.layerState[element] = visibility;
    }

}
