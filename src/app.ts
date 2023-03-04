import { container } from "./inversify/inversify.config";
import { TYPES } from "./inversify/types";

import { IDrawService } from "./services/draw.inverface";
import { IPlotDividerService } from "./services/plot-divider.interface";
import { IUserInputService } from "./services/user-input.interface";

const data = { width: 1680, height: 640 };

const userInputService = container.get<IUserInputService>(TYPES.UserInput);
document.getElementById('calculate').addEventListener('click', () => {
    try {
        const result = userInputService.getPlotValue();
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }
})

const drawService = container.get<IDrawService>(TYPES.DrawService);
drawService.initSvg(data.width, data.height);

const plotDivider = container.get<IPlotDividerService>(TYPES.PlotDivider);
const result = plotDivider.calculateUnit(data.width, data.height);
result.forEach((lineData, index) => {
    setTimeout(() => drawService.drawLine(lineData, "#848484"), index * 1000)
})

const context = drawService.drawGrid('grid-line');
for (let yCoord = data.height; yCoord > 0; yCoord -= 80) {
    for (let xCoord = 0; xCoord < data.width; xCoord += 80) {
        setTimeout(function () {
            drawService.drawSquare({ x1: xCoord, y1: yCoord, x2: 80, y2: 560 }, context, { color: "#c0c0c0" })
        }, xCoord)
    }
}
document.getElementById('hide-grid').addEventListener('click', () => {
    drawService.toggleElementVisibility('.grid-line');
})
