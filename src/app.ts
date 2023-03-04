import { container } from "./inversify/inversify.config";
import { TYPES } from "./inversify/types";

import { IDrawService } from "./services/draw.inverface";
import { IPlotDividerService } from "./services/plot-divider.interface";
import { IUserInputService } from "./services/user-input.interface";

const data = { width: 1680, height: 640 };

const drawService = container.get<IDrawService>(TYPES.DrawService);
const userInputService = container.get<IUserInputService>(TYPES.UserInput);
const plotDivider = container.get<IPlotDividerService>(TYPES.PlotDivider);

document.getElementById('calculate').addEventListener('click', () => {
    try {
        const plot = userInputService.getPlotValue();
        drawService.initSvg(plot.width, plot.height);
        const result = plotDivider.calculateUnit(plot.width, plot.height);
        console.log(result);
        result.forEach((lineData, index) => {
            setTimeout(() => drawService.drawLine(lineData, "#848484"), index * 1000)
        })

    } catch (e) {
        console.log(e.message);
    }
})



// const context = drawService.drawGrid('grid-line');
// for (let yCoord = data.height; yCoord > 0; yCoord -= 80) {
//     for (let xCoord = 0; xCoord < data.width; xCoord += 80) {
//         setTimeout(function () {
//             drawService.drawSquare({ x1: xCoord, y1: yCoord, x2: 80, y2: 560 }, context, { color: "#c0c0c0" })
//         }, xCoord)
//     }
// }

document.getElementById('hide-grid').addEventListener('click', () => {
    drawService.toggleElementVisibility('.grid-line');
})
