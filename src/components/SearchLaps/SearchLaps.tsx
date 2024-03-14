import { useParams } from "react-router-dom";
import { ListData } from "../../types/dataprops";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function SearchLaps({ renderData }: {
    renderData: ListData;
  }){

    const loadResource = (year: string | undefined, circuit: string | undefined) => {
      return fetch(`http://ergast.com/api/f1/${year}/${circuit}/laps.json?limit=1000`).then(
        (res) => res.json()
      );
    };

    const {year, circuit} = useParams<string>();
    const resultQuery = useQuery({
      queryKey: ["f1-result"],
      queryFn: () => loadResource(year, circuit),
    });

    console.log("resultQuery", resultQuery)
    return <> Hello Search</>
}