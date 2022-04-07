import React from "react";
import { db } from "../../../firebase/client";
import { useControlledInput } from "../../../hooks";
import { AiOutlineSend } from "../../../node_modules/react-icons/ai";
import { EVENTS } from "../../../constants";
import Filter from 'bad-words'
import { toast } from 'react-toastify';
type Props = {
  handleSubmit: Function;
};

const AskForm = (props: Props) => {
  const { value, handleChange, setValue } = useControlledInput('');
  const filter =new Filter()

  return (
    <div className="md:p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if(filter.isProfane(value)){
            setValue("");
            toast.error('Due to your use of vulgar language,You are banned from asking any questions for this event')
           return 
          }
          props.handleSubmit(value);
          setValue("");
        }}
        className="rounded-3xl  flex justify-between items-stretch bg-white border-none shadow-slate-600 shadow-sm "
      >
        <input
          type="text"
          placeholder="Ask a question?"
          className="p-3 px-4 w-4/5 capitalize rounded-l-3xl outline-none text-black font-sans text-lg tracking-wide"
          value={value}
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="bg-gradient-to-tr from-blue-600 to-blue-800 w-1/5 border-2 hover:bg-orange-500 p-2 rounded-r-3xl md:px-8 text-black flex justify-center items-center"
        >
          <AiOutlineSend color="#fff" size={25} />
        </button>
      </form>
    </div>
  );
};

export default AskForm;
