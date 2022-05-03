import React, { useState } from "react";
import {_Event } from "../types";
import { useContext } from "react";
import { eventContext } from "../../../context";
import Question from '../Question';
import AskForm from "./askForm";
import styles from '../../../styles/Home.module.css'
import { deleteDoc, doc } from "firebase/firestore";
import { EVENTS, QUESTIONS } from '../../../constants';
import { db } from "../../../firebase/client";
import { toast } from 'react-toastify';
type Props={
  eventCode:string
}
function QnA(props:Props) {
const event = useContext(eventContext);
const handleDelete=async(id:string)=>{
  console.log('id:',id)
  const questionref=doc(db,EVENTS,props.eventCode,QUESTIONS,id)
  await deleteDoc(questionref).then((_)=>{
toast.success('deleted successfully')
} 
).catch(err=>{
  console.log(err)
    toast.error('failed to delete')
    
  })

}
return (
  <div className={styles.questionsContainer}>

  <div className=" m-4 p-2 flex flex-col  md:grid max-h-full md:grid-cols-2 gap-4 md:gap-4 xl:gap-8 ">
    
    {event.questions && (
      event.questions.map((q,i)=><Question key={i} handleDelete={handleDelete} index={i+1} data={q.data()} questionId={q.id} />))}
  </div>
      </div>
);
}

export default QnA;
