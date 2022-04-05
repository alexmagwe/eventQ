import React, { useContext, useEffect, useState } from "react";
import QnA from "./qna/QnA";
import { Question, _Event } from "./types";
import { eventContext } from "../../context";
import { EVENTS, MEMBERS, QUESTIONS } from "../../constants";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  limit,
  Timestamp,
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
  const { data: eventData } = useFirestoreDocumentData<DocumentData>(
    [EVENTS, props.eventCode],
    eventRef
  );
  const handleSubmit = async (message: string) => {
    const questionsCollection = collection(
      db,
      EVENTS,
      props.eventCode,
      QUESTIONS
    );

    try {
      const payload: Question["data"] = {
        description: message,
        answered: false,
        createdAt: Timestamp.now(),
        answer: null,
        userName: user!.displayName as string,
      };
      let count = 0;
      event.questions!.map((q) => {
        if (q.data().userName == user?.displayName) {
          count += 1;
        }
      });
      if (count > 1) {
        toast.warning(
          "You can only ask a maximum of two questions,to ask another question, delete your original question"
        );
        return;
      }
      const docref = await addDoc(questionsCollection, payload);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
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
          <h1 className=" bg-clip-text mb-2 text-transparent capitalize  bg-gradient-to-br from-purple-600 text-center font-bold to-orange-400 text-5xl">
            {eventData && eventData.name}
          </h1>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5  w-full h-full grid-rows-3 gap-4">
          <div className="row-span-1 md:row-span-3 col-span-1">
            <h2>
              Members online
              <span className=" text-6xl rounded-full text-green-400 ">.</span>
            </h2>
            <ul className="flex flex-col gap-2 ">
              {members &&
                members.map((member, i) => (
                  <li key={i}>{member.data().name}</li>
                ))}
            </ul>
          </div>
          {event.questions && (
            <div className="row-span-2 col-span-2 md:col-span-4">
              <h1 className="p-2 px-8 text-xl text-bold text-slate-200">
                Questions
              </h1>
              <QnA eventCode={props.eventCode} />
            </div>
          )}
          <div className="  row-start-3  col-span-3 md:col-start-2 md:col-span-3">
            <AskForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
