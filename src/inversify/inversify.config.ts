import "reflect-metadata";
import { Container } from "inversify";

import { DrawService } from "../services/draw.service";
import { IDrawService } from "../services/draw.service.inverface";
import TYPES from "./types";

const container = new Container();
container.bind<IDrawService>(TYPES.DrawService).to(DrawService).inSingletonScope();

export default container;
