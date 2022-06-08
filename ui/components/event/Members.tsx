import React, { useContext } from "react";
import { DocumentData } from "firebase/firestore";
import { GrStatusGoodSmall } from "react-icons/gr";
import HasQuestion from "./HasQuestion";
import { FaUsers } from "react-icons/fa";
import { eventContext } from "../../context";
import { User } from "firebase/auth";
import { EventInfo } from "./types";

type Props = {
  members: DocumentData[];
  user:User|undefined|null,
  handleAllowButton:Function
  eventInfo:EventInfo|undefined|DocumentData
};

function Members(props: Props) {
  const {eventInfo,user,members,handleAllowButton}=props
  console.log(eventInfo,user?.uid)
 

  return (<div className="bg-slate-800 bg-opacity-90 p-4 rounded-md">
    <p className="text-xl flex gap-2  border-b-2 py-2 border-b-slate-600 text-green-300 font-mono my-2 font-bold">
              <span className="text-3xl">
                <FaUsers />
                </span>
              <span>Questions</span>
            </p>
    <ul className="flex  flex-col gap-2 ">
      {members &&
        members.map((member, i) => (
          member.data()!.hasQuestion?
            <li className="font-sans text-md py-1 flex gap-2 font-semibold justify-between items-center" key={i}>
            <span className="flex p-2 gap-2 items-center">
              {/* <span className="text-xs text-green-200">
            <GrStatusGoodSmall />
                </span> */}
          <span>{member.data()!.name}</span>
              <HasQuestion/>
              </span>
              {eventInfo?.creator===user?.uid&&<button onClick={()=>handleAllowButton(member.data()!.uid)} className="p-2 ml-2 rounded-xl text-lg font-bold px-4 bg-blue-600">Allow</button>}
              </li>
              :null
        ))}
    </ul>
        </div>
  );
}

export default Members;
