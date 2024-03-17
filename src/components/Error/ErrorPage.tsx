import { useRouteError } from "react-router-dom";
import Nav from "../Nav/Nav";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

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
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <p className="text-base font-semibold leading-8 text-white">
              Ooops!
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Sorry, an unexpected error has occurred.
            </h1>
            <p className="mt-4 text-base text-white/70 sm:mt-6">
              {error.statusText || error.message}
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="#"
                className="text-sm font-semibold leading-7 text-white"
              >
                <span aria-hidden="true">&larr;</span> Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
