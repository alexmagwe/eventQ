import { createContext, SetStateAction } from "react";
import { _Event, _EventContext } from "./components/event/types";
import { DocumentData } from 'firebase/firestore';
export const defaultEventContext={
  info: {},
  questions:[],
  setCurrentEvent:undefined,
  currentEvent:undefined,
  setQuestions:undefined
}
export const eventContext = createContext<_EventContext>(defaultEventContext);


