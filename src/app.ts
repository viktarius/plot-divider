import { container } from "./inversify/inversify.config";
import { TYPES } from "./inversify/types";

import { IDrawService } from "./services/draw.inverface";
import { IPlotDividerService } from "./services/plot-divider.interface";
import { IUserInputService } from "./services/user-input.interface";

const drawService = container.get<IDrawService>(TYPES.DrawService);
const userInputService = container.get<IUserInputService>(TYPES.UserInput);
const plotDivider = container.get<IPlotDividerService>(TYPES.PlotDivider);

document.getElementById('calculate').addEventListener('click', () => {
    try {
        const plot = userInputService.getPlotValue();
        drawService.initSvg(plot.width, plot.height);
        const result = plotDivider.calculateUnit(plot.width, plot.height);
        console.log(result);
        const lineGroup = drawService.createGroup('algorithm-lines');
        result.forEach((lineData, index) => {
            drawService.drawLine(lineData, lineGroup, { color: "#848484" })
        })

        const square = result[result.length - 1][0];
        const context = drawService.createGroup('grid');
        const x2 = square[0];
        const y2 = plot.height -  square[1];
        for (let yCoord = plot.height; yCoord > 0; yCoord -= square[1]) {
            for (let xCoord = 0; xCoord < plot.width; xCoord += square[0]) {
                setTimeout(function () {
                    drawService.drawSquare({ x1: xCoord, y1: yCoord, x2, y2 }, context, { color: "#c0c0c0" })
                }, xCoord)
            }
        }

    } catch (e) {
        console.log(e.message);
    }
})

document.getElementById('hide-grid').addEventListener('click', () => {
    drawService.toggleElementVisibility('.grid');
})
