import React from 'react'
import { Question } from './types'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/client';
import { AiFillDelete } from 'react-icons/ai';


function Question(props: Question) {
  const [user,loading]=useAuthState(auth)
    const {data}=props

  return (
   <p className={`flex md:max-w-xs font-mono xl:max-w-lg 2xl:max-w-xl relative xl:p-4 2xl:px-8  2xl:pt-4 2xl:pb-8 bg-gradient-to-r from-blue-600 to-blue-800  ${data.userName==user?.displayName?'border-2 border-green-500': ''} p-4 rounded-xl flex-col gap-2`}>
       <span className='text-md text-slate-300 bg-slate-700 rounded-full p-1 lg:text-lg absolute top-2 left-2'>{props.index}</span>
       <span className='text-md text-slate-300  text-right'>{data.userName}</span>
       <span className='text-xl text-center capitalize md:text-xl xl:text-3xl'>{data.description}</span>
       {data.userName==user?.displayName&&<button onClick={()=>props.handleDelete(props.questionId)} className='text-md text-slate-300 lg:text-lg absolute bottom-3 right-3'><AiFillDelete/></button>}
   </p>
  )
}

export default Question