/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import { useContext } from "react";
import { eventContext } from "../context";
import { _Event } from "./event/types";
import CurrentEvent from "./CurrentEvent";
type Props = {};

function Hero({}: Props) {
  const { currentEvent } = useContext(eventContext);

  return (
    <>
      <div className="w-full sm:px-4  py-4 md:px-24 md:pt-4 md:pb-36 2xl:py-56 ">
        <h1 className="text-4xl md:text-5xl w-full md:w-1/2 font-bold my-4 mb-8  xl:text-6xl ">
          Engaging in events has never been easier
        </h1>
        <div className="flex gap-4 lg:gap-8 mx-auto text-white font-bold">
          <div className="p-4 lg:text-lg lg:px-8  bg-cyan-400  hover:bg-cyan-300 hover:cursor-pointer shadow-slate-800 rounded-lg flex justify-center items-center">
            <Link href="/create" passHref>
              <a>Create Event</a>
            </Link>
          </div>
          <div className="p-4 lg:text-lg lg:px-8 shadow-slate-800 hover:bg-purple-500 hover:cursor-pointer bg-orange-500 rounded-lg flex justify-center items-center">
            <Link href="/join" passHref>
              <a>Join Event</a>
            </Link>
          </div>
        </div>
        {currentEvent && (
         <CurrentEvent currentEvent={currentEvent}/>
        )}
      </div>
    </>
  );
}

export default Hero;
