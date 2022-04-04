import { useRouter } from "next/router";
import React from "react";
import { useControlledInput } from "../hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/client";
import { toast, ToastContainer } from "react-toastify";

import {
  doc,
  DocumentData,
  getDoc,
  limit,
  query,
  where,
} from "firebase/firestore";
import { eventsCollection } from "../firebase/collections";

function JoinEvent() {
  let { value, handleChange } = useControlledInput();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  async function findEvent(code: string) {
    const q = query(eventsCollection, where("code", "==", code), limit(1));
    const eventRef = doc(eventsCollection, code);
    const eventSnap = await getDoc(eventRef);

    if (eventSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }
  async function joinEvent(e: any) {
    e.preventDefault();
    let res = await findEvent(value);
    console.log(res);

    if (res) {
      router.push(`/e/${value}`);
    } else {
      toast.error("Event not found", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="flex lg:w-1/2 p-24 justify-center mx-auto items-center">
      <ToastContainer />
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={joinEvent}
      >
        <h1 className="text-6xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-br from-purple-500 to-orange-500 ">
          Enter event code
        </h1>
        <input
          className="border-b-2 border-pink-500  p-2 bg-transparent mt-4 outline-none font-sans text-3xl text-center"
          type="text"
          autoFocus={true}
          maxLength={6}
          enterKeyHint={"previous"}
          value={value}
          onChange={(e) => handleChange(e)}
        />

        <button
          type="submit"
          className="bg-gradient-to-br from-orange-500 to-purple-600 text-white w-full mt-8 p-2 rounded-md outline-none  text-3xl text-center"
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinEvent;
function updateCollection(
  q: Query<DocumentData>,
  arg1: { users: string | null | undefined }
) {
  throw new Error("Function not implemented.");
}
