import React, { useState } from "react";
import {_Event } from "../types";
import { useContext } from "react";
import { eventContext } from "../../../context";
import Question from '../Question';
import AskForm from "./askForm";
function QnA() {
const event = useContext(eventContext);
return (
  <div>

  <div className="bg-white w-1/2 ">
    
    {event.questions && (
      event.questions.map((q,i)=><Question key={q.questionId} data={q.data} questionId={q.questionId} />))}
  </div>
      </div>
);
}

export default QnA;
