import React from 'react'
import { useControlledInput } from '../../../hooks';
import { AiOutlineSend } from '../../../node_modules/react-icons/ai';
type Props = {}

const AskForm = (props: Props) => {
    const {value,handleChange}=useControlledInput()
  return (
    <div className='md:p-4'>
        <form className='rounded-3xl  flex justify-between items-stretch bg-white border-none shadow-slate-600 shadow-sm '>
            <input type='text' placeholder='Ask a question?' className='p-3 px-4 w-4/5 capitalize rounded-l-3xl outline-none text-black font-sans text-lg tracking-wide' value={value} onChange={handleChange}></input>
       <button type='submit' className='bg-orange-600 w-1/5 border-2 hover:bg-orange-500 p-2 rounded-r-3xl md:px-8 text-black flex justify-center items-center'><AiOutlineSend color='#fff' size={25}/></button>
        </form>

    </div>
  )
}

export default AskForm