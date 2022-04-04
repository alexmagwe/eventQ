import React, {useEffect, useState } from "react";
import QnA from "./qna/QnA";
import {_Event, } from "./types";
import { eventContext } from "../../context";
import { EVENTS, MEMBERS, QUESTIONS } from "../../constants";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,

  onSnapshot,
  QueryDocumentSnapshot,
 
  setDoc,
} from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { db, auth } from "../../firebase/client";

import { eventsCollection } from "../../firebase/collections";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
type Props = {
  eventCode: string;
};

function Main(props: Props) {
  const [members,setMembers]=useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [questions,setQuestions]=useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const eventRef = doc(eventsCollection, props.eventCode);
  const { data: eventData } = useFirestoreDocumentData(
    [EVENTS, props.eventCode],
    eventRef
  );
  useEffect(()=>{
    let unsubscribeMembers:Function=()=>{};
    let unsubscribeQuestions:Function=()=>{};
    try{
       unsubscribeMembers = onSnapshot(collection(db, EVENTS, props.eventCode, MEMBERS),(snapshot)=>{
         setMembers(snapshot.docs)
      })
       unsubscribeQuestions = onSnapshot(collection(db, EVENTS, props.eventCode, QUESTIONS),(snapshot)=>{
         setQuestions(snapshot.docs)
      })
    }catch(err){
      unsubscribeMembers()
      unsubscribeQuestions()
      
    }
  },[props.eventCode])

  useEffect(() => {
    if (!loading && !user)
      router.push({
        pathname: "/login",
        query: { next: "/e/" + props.eventCode },
      });
  }, [user, loading, router, props.eventCode]);


  useEffect(() => {
    if (!loading && user) {
      const memberRef = doc(db, EVENTS, props.eventCode, MEMBERS, user!.uid);
      try {
        setDoc(memberRef, { name: user.displayName });
      } catch (err) {
        console.error(err);
      }
      return () => {
        deleteDoc(memberRef);
      };
    }
  }, [loading, props.eventCode, user]);

  return (
    <eventContext.Provider value={{ info: eventData && eventData, questions:questions }}>
      <div>
        {eventData && (
          <h1 className=" bg-clip-text text-transparent capitalize  bg-gradient-to-br from-purple-600 text-center font-bold to-cyan-400 text-5xl">
          {eventData && eventData.name}
          </h1>
        )}
        <div>
          Users online <span className=" text-6xl rounded-full text-green-400 ">.</span>
          {members &&
            members.map((member, i) => (
              <ul key={i}>{member.data().name}</ul>
            ))}
        </div>
        {eventData && (
          <div>
            <QnA />
          </div>
        )}
      </div>
    </eventContext.Provider>
  );
}

export default Main;
