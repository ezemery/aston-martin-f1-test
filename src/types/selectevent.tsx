export type SelectEventType =  {
    season: string
    round: string
    url?: string
    raceName?: string
    Circuit?: Circuit
    date?: string
    time?: string
  }
  
  export interface Circuit {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
  }
  
  export interface Location {
    lat: string
    long: string
    locality: string
    country: string
  }
  