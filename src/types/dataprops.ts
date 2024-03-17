import { UseQueryResult } from "@tanstack/react-query";
type raceType = {
    [key: string]:number
  }

export type ListData = {
    RACEYEARS: raceType[],
    circuitQuery:  UseQueryResult<any, Error>,
    setSeason: React.Dispatch<React.SetStateAction<string>>;
    season: string;
    setCircuit: React.Dispatch<React.SetStateAction<string>>;
    circuit: string;
  };