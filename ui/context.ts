import { createContext } from "react";
import { _Event } from "./components/event/types";
export const defaultEvent={
  info: {
    name: "",
    startTime: null,
    code: "",
    host: "",
  },
  questions: [],
}
export const eventContext = createContext({});
