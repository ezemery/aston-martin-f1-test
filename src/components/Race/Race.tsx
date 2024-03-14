import { SyntheticEvent, useRef } from "react";
import { ListData } from "../../types/dataprops";
import Nav from "../Nav/Nav";
import { Select } from "../commons/Select/Select";
import { useNavigate } from "react-router-dom";

export default function Race({ renderData }: { renderData: ListData }) {
  console.log(renderData);
  const yearRef = useRef<HTMLSelectElement>(null);
  const circuitRef = useRef<HTMLSelectElement>(null);
  let navigate = useNavigate();

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    navigate(
      `/search/race/${yearRef.current?.value}/${circuitRef.current?.value}`
    );
  };

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
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Choose your race event</h1>
            <div className="mb-4">
              <label htmlFor="race" className="block text-sm mb-1">
                Race:
              </label>
              <Select
                label="label"
                value="value"
                ref={yearRef}
                data={renderData.RACEYEARS}
                fireEventChange={renderData.setSeason}
              />
            </div>
            <form
              onSubmit={submitForm}
              className="w-full max-w-md lg:col-span-5 lg:pt-2"
            >
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm mb-1">
                  Location:
                </label>
                <Select
                  label="raceName"
                  value="round"
                  ref={circuitRef}
                  data={
                    renderData.circuitQuery.isFetching
                      ? [{ round: "" }]
                      : renderData.circuitQuery.data.MRData.RaceTable.Races
                  }
                  fireEventChange={renderData.setCircuit}
                />
              </div>
              <button
                type="submit"
                disabled={renderData.circuitQuery.isFetching}
                className="bg-indigo-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Search Race
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
