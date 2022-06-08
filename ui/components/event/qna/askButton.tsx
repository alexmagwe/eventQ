import React from "react";
import { auth, db } from "../../../firebase/client";
import { useControlledInput } from "../../../hooks";
import { AiOutlineSend } from "react-icons/ai";
import { EVENTS } from "../../../constants";
import Filter from "bad-words";
import { toast } from "react-toastify";
import { FaHandPaper } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AskButton = (props: Props) => {
  const [user, loading] = useAuthState(auth);

  return (
    <button
      onClick={props.handleClick}
      className="flex justify-center items-center"
    >
      <FaHandPaper color="#fff" size={45} />
    </button>
  );
};

export default AskButton;
