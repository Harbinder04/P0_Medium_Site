import React from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();

  //ansure that user enter something in search
  const routeChange = () =>{
     navigate("/publish")
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 mx-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white mr-8">
            BloGy Fi
          </span>
        </a>
        <SearchBar />
        <div className="bg-green-600 hover:bg-green-400 rounded-full px-5 py-2 font-semibold text-white">
          <button onClick={routeChange}>Create</button>
        </div>
      </div>
    </nav>
  );
};

function SearchBar(){
  return <>
  <div className={`md:flex md:flex-row hidden md:visible`}>
   <div className="relative w-fit">
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
            placeholder="Search..."
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gray-800 rounded-lg border border-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
        </div>
   </>
}