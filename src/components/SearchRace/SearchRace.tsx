import { Link, useParams } from "react-router-dom";
import { ListData } from "../../types/dataprops";
import { useQuery } from "@tanstack/react-query";
import Nav from "../Nav/Nav";
import { Chart } from "../commons/Chart/Chart";

type ResultType = {
  [key: string]: any;
};

export default function SearchRace({ renderData }: { renderData: ListData }) {
  const { year, circuit } = useParams<string>();

  const loadResource = (
    year: string | undefined,
    circuit: string | undefined
  ) => {
    return fetch(
      `https://ergast.com/api/f1/${year}/${circuit}/results.json`
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
  };

  const resultQuery = useQuery({
    queryKey: ["f1-result"],
    queryFn: () => loadResource(year, circuit),
  });

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
            pt-8 
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
              <div className="bg-gray-900">
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
                            {`
                              Circuit Name: ${resultQuery.data.MRData.RaceTable.Races[0].Circuit.circuitName} 
                            `}
                          </h1>
                          <h1 className="text-base font-semibold leading-6 text-white">
                            {`
                              Country: ${resultQuery.data.MRData.RaceTable.Races[0].Circuit.Location.country}   
                            `}
                          </h1>
                          <h1 className="text-base font-semibold leading-6 text-white">
                            {`
                              Locality: ${resultQuery.data.MRData.RaceTable.Races[0].Circuit.Location.locality}
                            `}
                          </h1>
                          <p className="mt-2 text-sm text-gray-300">
                            Check race results, points and teams
                          </p>
                        </div>
                        <div className="sm:mt-4 sm:flex-none">
                          <Link
                            to={`/search/laps/${year}/${circuit}`}
                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          >
                            Get results for laps
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flow-root">
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block overflow-x py-2 align-middle sm:px-6 lg:px-8">
                          <table className="w-full divide-y divide-gray-700">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                                >
                                  Driver Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Position
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Fastest Lap
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Finish Time
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Points
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Team
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                >
                                  Team Country
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {resultQuery.data.MRData.RaceTable.Races[0]?.Results.map(
                                (result: ResultType, index: number) => (
                                  <tr key={index}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{`${
                                      result.Driver
                                        ? result.Driver.givenName
                                        : "-"
                                    } ${
                                      result.Driver
                                        ? result.Driver.familyName
                                        : "-"
                                    }`}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.position}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.FastestLap
                                        ? result.FastestLap.lap
                                        : "-"}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.Time ? result.Time.time : "-/-"}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.status}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.points}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.Constructor
                                        ? result.Constructor.name
                                        : "-"}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                      {result.Constructor
                                        ? result.Constructor.nationality
                                        : "-"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
