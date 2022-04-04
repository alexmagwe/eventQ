import React, { useState } from "react";
import {_Event } from "../types";
import { useContext } from "react";
import { eventContext } from "../../../context";
import Question from '../Question';
function QnA() {
const event = useContext(eventContext);
return (
  <div className="bg-white w-1/2 ">
    
    {event.questions && (
        questions.map((q,i)=><Question key={q.questionId} data={q.data} questionId={q.questionId} />))}
  </div>
);
}

export default QnA;
