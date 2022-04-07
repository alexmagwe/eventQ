import React from "react";
import { DocumentData } from "firebase/firestore";
import { GrStatusGoodSmall } from "react-icons/gr";

type Props = {
  members: DocumentData[];
};

function Members(props: Props) {
  const { members } = props;
  return (
    <ul className="flex flex-col gap-2 ">
      {members &&
        members.map((member, i) => (
          <li className="font-mono text-md flex gap-2 font-semibold justify-start items-center" key={i}>
            <span>{member.data().name}</span>
            <span className="text-xs text-green-200">
              <GrStatusGoodSmall />
            </span>
          </li>
        ))}
    </ul>
  );
}

export default Members;
