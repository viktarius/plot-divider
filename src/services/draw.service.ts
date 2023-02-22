import { injectable } from "inversify";
import { select } from 'd3-selection';

import { IDrawService } from "./draw.service.inverface";
import { line, scaleLinear } from "d3";
import { ScaleLinear } from "d3-scale";
import { Line } from "d3-shape";

@injectable()
export class DrawService implements IDrawService {
    private svg: any;
    private x: ScaleLinear<number, number>;
    private y: ScaleLinear<number, number>;
    private lineFn: Line<[number, number]>;

    constructor() {
        console.log('draw service inited');
    }

    public initSvg(width: number, height: number) {
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
            .attr('width', width + svgMargin + svgMargin)
            .attr('height', height + svgMargin + svgMargin)
            .append('g')
            .attr('transform', 'translate(' + svgMargin + ', ' + svgMargin + ')');
    }

    public drawLine(data: number[][], color: string = 'black') {
        this.svg.append('path')
            .attr('d', this.lineFn(data))
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1);
    }

}
