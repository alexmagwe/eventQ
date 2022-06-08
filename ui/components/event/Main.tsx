import React, { useContext, useEffect, useState } from "react";
import QnA from "./qna/QnA";
import { EventInfo, Question, QuestionSchema, _Event } from "./types";
import { eventContext } from "../../context";
import { EVENTS, MEMBERS, QUESTIONS } from "../../constants";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  getDoc,
  limit,
  arrayUnion,
  DocumentData,
  onSnapshot,
  orderBy,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { db, auth } from "../../firebase/client";

import { eventsCollection } from "../../firebase/collections";
import { toast, ToastContainer } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import AskForm from "./qna/askForm";
import { FaMicrophone, FaUsers } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import Members from "./Members";
import AskButton from "./qna/askButton";
import Timeline from "./Timeline";
import MicButton from "./MicButton";
type Props = {
  eventCode: string;
};

function Main(props: Props) {
  const event = useContext(eventContext);
  const [members, setMembers] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const eventRef = doc(eventsCollection, props.eventCode);
  const { data: eventData } = useFirestoreDocumentData<DocumentData|EventInfo>(
    [EVENTS, props.eventCode],
    eventRef
  );
  const handleClick = async () => {
    const memberDoc = doc(db, EVENTS, props.eventCode, MEMBERS, user!.uid);
    const memberSnap = await getDoc(memberDoc);

    try {
      // const payload: Question["data"] = {
      //   createdAt: Timestamp.now(),
      //   userName: user!.displayName as string,
      //   userId:user!.uid
      // };
      await updateDoc(memberDoc, {
        hasQuestion: memberSnap.data()!.hasQuestion ? false : true,
      });
      // await updateDoc(memberDoc, {hasQuestion:memberSnap.data().hasQtrue});
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  const handleAllowButton=async(uid:string)=>{
    try{

      await updateDoc(eventRef,{allowedSpeakers:arrayUnion(uid),})
      toast.success("member allowed to speak");
    }
    catch(e){
      toast.error(`${e}`);

    }


  }
  useEffect(() => {
    let unsubscribeMembers: Function = () => {};
    let unsubscribeQuestions: Function = () => {};
    try {
      unsubscribeMembers = onSnapshot(
        collection(db, EVENTS, props.eventCode, MEMBERS),
        (snapshot) => {
          setMembers(snapshot.docs);
        }
      );
      unsubscribeQuestions = onSnapshot(
        query(
          collection(db, EVENTS, props.eventCode, QUESTIONS),
          orderBy("createdAt"),
          limit(10)
        ),
        (snapshot) => {
          event.setQuestions!(snapshot.docs);
        }
      );
    } catch (err) {
      unsubscribeMembers();
      unsubscribeQuestions();
    }
    return ()=>{
      unsubscribeMembers();
      unsubscribeQuestions();

    }
  }, [event.setQuestions, props.eventCode]);

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
  useEffect(() => {
    return () => {
      if (event.setCurrentEvent) {
        event.setCurrentEvent(eventData!);
      }
    };
  }, [event, eventData]);
  useEffect(() => {
    if (event.questions) {
      console.log("questions:", event.questions);
    }
  }, [event.questions]);
  return (
    <>
      <ToastContainer />
      <div className="p-2 md:px-12 relative h-full">
        {eventData && (
          <h1 className=" bg-clip-text mb-2 text-transparent capitalize bg-gradient-to-br from-cyan-400 text-center font-bold to-blue-600 text-5xl">
            {eventData && eventData.name}
          </h1>
        )}
        <div className=" flex w-full  my-2 gap-4">
          <div className="w-1/4">
            <Members members={members} user={user} eventInfo={eventData} handleAllowButton={handleAllowButton}/>
          </div>
          <Timeline />
        </div>
        <div className="flex absolute bottom-32 w-full justify-center ">
          <div className="p-4 rounded-full active:bg-green-500 transition-colors duration-200 flex justify-center items-center bg-blue-600 ">
          {!eventData?.allowedSpeakers?.includes(user?.uid)?<AskButton handleClick={handleClick} />:
           <MicButton/>
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
