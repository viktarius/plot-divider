import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";
import { DrawService } from "../services/draw.service";
import { IDrawService } from "../services/draw.inverface";
import { PlotDividerService } from "../services/plot-divider.service";
import { IPlotDividerService } from "../services/plot-divider.interface";
import { UserInputService } from "../services/user-input.service";
import { IUserInputService } from "../services/user-input.interface";


const container = new Container();
container.bind<IDrawService>(TYPES.DrawService).to(DrawService).inSingletonScope();
container.bind<IPlotDividerService>(TYPES.PlotDivider).to(PlotDividerService).inSingletonScope();
container.bind<IUserInputService>(TYPES.UserInput).to(UserInputService).inSingletonScope();

export { container };
