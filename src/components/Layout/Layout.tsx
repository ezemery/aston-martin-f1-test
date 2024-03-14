import { useState, useEffect } from "react";
import { ListData } from "../../types/dataprops";
import { RACEYEARS } from "../../constants/constants";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

type LayoutProps = {
  render: (data: ListData) => React.JSX.Element;
};

const loadResource = (season: string) => {
  console.log("calling api", season);
  return fetch(`https://ergast.com/api/f1/${season}.json`).then(
    (res) => res.json()
  );
};

export const Layout = ({ render }: LayoutProps) => {
  const queryClient = useQueryClient();
  console.log(RACEYEARS)
  const [season, setSeason] = useState<string>(String(RACEYEARS[0].value));
  const [circuit, setCircuit] = useState<string>("");

  const circuitQuery = useQuery({
    queryKey: ["f1"],
    queryFn: () => loadResource(season),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });


  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["f1"],
      queryFn: () => loadResource(season),
    });
  }, [season]);

  return render({
    RACEYEARS,
    circuitQuery,
    setSeason,
    season,
    circuit,
    setCircuit,
  });
};
