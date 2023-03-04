import { IPlot } from "./draw.inverface";

export interface IUserInputService {
    getPlotValue(): IPlot | never
}
