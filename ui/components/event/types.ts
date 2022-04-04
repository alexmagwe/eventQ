export type _Event = {
  info: { name: string; startTime: Date |null ; code: string; host: string } ;
  questions: Question[];
};
export type Question = {
  questionId:string
  data: {
    description: string;
    answered: boolean;
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
