import { createContext } from "react";
import { _Event } from "./components/event/types";
import { DocumentData } from 'firebase/firestore';
export const defaultEvent={
  info: {},
  questions:[],
}
export const eventContext = createContext<_Event>(defaultEvent);
