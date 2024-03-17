import { useParams } from "react-router-dom";
import { ListData } from "../../types/dataprops";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Nav from "../Nav/Nav";
import { Chart } from "../commons/Chart/Chart";

export default function SearchLaps({ renderData }: {
    renderData: ListData;
  }){

    const loadResource = (year: string | undefined, circuit: string | undefined) => {
      return fetch(`https://ergast.com/api/f1/${year}/${circuit}/laps.json?limit=1000`).then(
        (res) => res.json()
      );
    };

    const {year, circuit} = useParams<string>();
    const resultQuery = useQuery({
      queryKey: ["f1-result"],
      queryFn: () => loadResource(year, circuit),
    });

    console.log("resultQuery", resultQuery)
    return (
      <>
      <div>
        <Nav />
        <div
          className="
            flex 
            items-center 
            justify-center 
            min-h-screen 
            relative 
            isolate 
            overflow-hidden 
            pt-14 
            bg-cover 
            bg-no-repeat 
            bg-center
            bg-[url('https://images.pexels.com/photos/12989709/pexels-photo-12989709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
            before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-neutral-900
            before:opacity-80
            before:z-[-5]
            "
        >
          <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
              <div className="bg-gray-900 py-10">
                {!resultQuery.isFetching && (
                  <div className="sm:flex flex-col p-10">
                    {resultQuery.data.MRData.RaceTable.Races.length <= 0 ? (
                      <h1 className="text-base font-semibold leading-6 text-white">
                        Oops, No data to show...
                      </h1>
                    ) : (
                      <div className="sm:flex-auto">
                        <div>
                          <h1 className="text-base font-semibold leading-6 text-white">
                            {
                              resultQuery.data.MRData.RaceTable.Races[0].Circuit
                                .circuitName
                            }
                          </h1>
                          <p className="mt-2 text-sm text-gray-300">
                            Check winners for each laps and the time between lap leader and other racers by sliding the slider below
                          </p>
                        </div>

                        <div className="mt-8 flow-root">
                          <Chart data={resultQuery.data.MRData.RaceTable.Races[0].Laps}/>
                        </div>
                        
                      </div>
                    )}
                     

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}