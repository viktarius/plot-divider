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

    public initSvg(width: number, height: number): void {
        const svgMargin = 20;
        let svgWidth;
        let svgHeight;

        const visualizationBlock = document.getElementById('plot-divider-visualization')
        const svgWrapperWidth = visualizationBlock.offsetWidth;
        const svgWrapperHeight = visualizationBlock.offsetHeight;

        if (width / height >= svgWrapperWidth / svgWrapperHeight) {
            svgWidth = svgWrapperWidth;
            svgHeight = svgWrapperHeight /  (1 + width / height - svgWrapperWidth / svgWrapperHeight);
            console.log(svgWrapperHeight, width / height, svgWrapperWidth / svgWrapperHeight)
        } else {
            svgHeight = svgWrapperHeight;
            svgWidth = svgWrapperWidth / (1 + svgWrapperWidth / svgWrapperHeight - width / height)
        }

        this.x = scaleLinear()
            .domain([0, width])
            .range([0, svgWidth - svgMargin- svgMargin]);

        this.y = scaleLinear()
            .domain([0, height])
            .range([svgHeight - svgMargin- svgMargin, 0]);

        this.lineFn = line()
            .x(([width, height]) => this.x(width))
            .y(([width, height]) => this.y(height))

        this.svg = select('#plot-divider-visualization')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', 'translate(' + svgMargin + ', ' + svgMargin + ')');

        this.drawBorder(width, height);
    }

    public drawLine(data: number[][], context: any = this.svg, option?: Record<any, any>): void {
        context
            .append('path')
            .attr('d', this.lineFn(data))
            .attr('fill', 'none')
            .attr('stroke', option?.color || 'black')
            .attr('stroke-width', 1);
    }

    public drawSquare(data: { x1, y1, x2, y2 }, context: any = this.svg, option?: Record<any, any>): void {
        context
            .append('rect')
            .attr('x', () => this.x(data.x1))
            .attr('y', () => this.y(data.y1))
            .attr('width', () => this.x(data.x2))
            .attr('height', () => this.y(data.y2))
            .style('stroke', "#000000")
            .style('fill', option?.color || 'black');
    }

    public createGroup(gridName: string) {
        return this.svg.append('g').classed(gridName, true);
    }

    // TODO: try to use context instead of string selector
    public toggleElementVisibility(element: string): void {
        const visibility = this.layerState[element] = !isNil(this.layerState[element])
            ? !this.layerState[element]
            : false;
        this.svg.select(element).style('visibility', visibility ? 'visible' : 'hidden');
        this.layerState[element] = visibility;
    }

    private drawBorder(width: number, height: number) {
        const context = this.createGroup('border');
        this.drawLine([[0, 0], [width, 0]], context, { color: 'red' })
        this.drawLine([[0, 0], [0, height]], context, { color: 'red' })
        this.drawLine([[0, height], [width, height]], context, { color: 'red' })
        this.drawLine([[width, 0], [width, height]], context, { color: 'red' })
    }

}
