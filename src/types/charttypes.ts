import { NumberValue } from "d3"

export type ChartData = Data[]

export interface Data {
  number: string
  Timings: Timing[]
}

export interface Timing {
  driverId: string
  position: NumberValue
  time: number
  y: NumberValue
  timeToLeader: NumberValue
}
