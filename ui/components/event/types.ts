import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
export type _Event = {
  info: DocumentData|undefined|EventInfo ;
  questions: DocumentData[]|undefined|QuestionSchema[];

};
export type EventInfo={
  id:string
  name:string
location:string
date:string
time:string
duration:number
code:string
}
export type _EventContext = {
  info: DocumentData|undefined|EventInfo ;
  questions: DocumentData[]|undefined;
  setCurrentEvent:Dispatch<SetStateAction<_Event|undefined|DocumentData>>|undefined
  currentEvent:EventInfo|undefined|DocumentData
  setQuestions:Dispatch<SetStateAction<QueryDocumentSnapshot<DocumentData>[]|undefined>>|undefined

};
export type ControlledInputType={
  handleChange:(e:any)=>void
  setValue:Dispatch<SetStateAction<string>>
  value:string
}
export type Question = {
  index:number,
  handleDelete:Function
  questionId:string
  data: {
    description: string;
    answered: boolean;
    createdAt:Timestamp
    answer: string | null;
    userName: string;
  };
};
export type QuestionSchema = {
  id:string
  data: {
    description: string;
    answered: boolean;
    createdAt:Timestamp
    answer: string | null;
    userName: string;
  };
};
export type User ={
  user_id:string
}
export type EventForm={
name:string
location:string
date:string
time:string
duration:number
code:string
}
export type EventFormErrors={
name:string|null
location:string|null
date:string|null
time:string|null
duration:string|null
}|{}
export type Member={
  name:string
}
