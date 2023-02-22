import { container, TYPES } from "./inversify";

import { getPart } from './part';
import { IDrawService } from "./services/draw.service.inverface";

const data = { width: 1680, height: 640 };

// const svg = d3.select('#plot-divider-visualization')
//     .append('svg')
//     .attr('width', svgWidth + svgMargin + svgMargin)
//     .attr('height', svgHeight + svgMargin + svgMargin)
//     .append('g')
//     .attr('transform', 'translate(' + svgMargin + ', ' + svgMargin + ')');

// svg.append('rect')
//     .attr('x', () => 0)
//     .attr('y', () => 0)
//     .attr('width', () => svgWidth)
//     .attr('height', () => svgHeight)
//     .style("stroke", "black")
//     .style("fill", "#69b3a2");

// const x = d3.scaleLinear()
//     .domain([0, data.width])
//     .range([0, svgWidth]);

// const y = d3.scaleLinear()
//     .domain([0, data.height])
//     .range([svgHeight, 0]);

// const line = d3.line()
//     .x(d => x(d.width))
//     .y(d => y(d.height))

// export function draw(data, color) {
//     svg.append('path')
//         .attr('d', line(data))
//         .attr('fill', 'none')
//         .attr('stroke', color)
//         .attr('stroke-width', 1);
// }

// for(let xCoord = result.width; xCoord <= data.width; xCoord += result.width ) {
//     draw(
//         [
//             {
//                 width: xCoord,
//                 height: 0
//             },
//             {
//                 width: xCoord,
//                 height: data.height
//             }
//         ]
//         ,
//         'blue'
//     )
// }
//
// for(let yCoord = result.height; yCoord <= data.height; yCoord += result.height ) {
//     draw(
//         [
//             {
//                 width: 0,
//                 height:  yCoord
//             },
//             {
//                 width: data.width,
//                 height: yCoord
//             }
//         ]
//         ,
//         'blue'
//     )
// }

const drawService = container.get<IDrawService>(TYPES.DrawService);
drawService.initSvg(data.width, data.height);
const result = getPart(data.width, data.height);
result.forEach( (lineData, index) => {
    setTimeout(() => drawService.drawLine(lineData, 'steelblue'), index * 1000)
})
