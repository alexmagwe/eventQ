/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { eventContext } from "../context";
import { _Event } from "./event/types";
let socket: any;
type Props = {};

function Hero({}: Props) {
  const { currentEvent } = useContext(eventContext);

  return (
    <>
      <div className="w-full px-12 py-4 md:px-24 md:pt-4 md:pb-36 2xl:py-56 ">
        <h1 className="text-5xl w-full md:w-1/2 font-bold my-4 mb-8  xl:text-6xl ">
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
          <div className=" mt-4 md:mt-8">
            <h1 className="text-2xl capitalize font-sans ">Recent events</h1>
            <Link href={`/e/${currentEvent.code}`} passHref>
              <div className="bg-slate-700 my-4 cursor-pointer w-min rounded-lg p-8 py-8">
                <h1 className="text-2xl  capitalize font-bold font-sans">
                  {currentEvent.name}
                </h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Hero;
