/* eslint-disable @next/next/no-img-element */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "firebase/auth";
import "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/nav/NavBar";
import bg from "../public/images/bg.jpg";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { eventContext } from "../context";
import { useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { EventInfo, _Event } from "../components/event/types";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [currentEvent,setCurrentEvent]=useState<EventInfo|undefined|DocumentData>()
    const [questions, setQuestions] = useState<
    QueryDocumentSnapshot<DocumentData>[]|undefined
  >([]);
  return (
    <eventContext.Provider value={{ info: undefined, questions: questions,setQuestions:setQuestions, currentEvent:currentEvent, setCurrentEvent:setCurrentEvent }}>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen overflow-hidden relative">
          <img
            src={bg.src}
            className="w-full bg-cover object-cover h-full bg-no-repeat absolute -z-10"
            alt=""
          ></img>

          <NavBar />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </eventContext.Provider>
  );
}

export default MyApp;
