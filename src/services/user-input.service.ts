import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";

import { IUserInputService } from "./user-input.interface";
import { IDrawService, IPlot } from "./draw.inverface";
import { isNil } from "../core/utils/core-util";

@injectable()
export class UserInputService implements IUserInputService {
    private _drawService: IDrawService;

    public constructor(@inject(TYPES.DrawService) drawService: IDrawService) {
        this._drawService = drawService;
    }

    public getPlotValue(): IPlot | never {
        const widthInput = document.getElementById('plot-width') as HTMLInputElement | null;
        const heightInput = document.getElementById('plot-height') as HTMLInputElement | null;
        const width = +widthInput?.value;
        const height = +heightInput?.value;
        console.log(width, height);

        if (!isNil(width) && !isNil(width)) {
            return { height, width }
        } else {
            throw new Error('something went wrong')
        }
    }

}
