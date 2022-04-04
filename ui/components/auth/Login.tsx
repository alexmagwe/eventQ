import React from 'react'
import { auth } from '../../firebase/client'
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import Router, { useRouter } from 'next/router';

type Props = {
  next:string|null
}

function Login(props: Props) {
 const router= useRouter()
    const signIn=async()=>{
        const provider=new GoogleAuthProvider()
       signInWithPopup(auth, provider).then(()=>{
         if(props.next){
           Router.push(props.next)
         }
        },
        (error)=>{
          toast.error(error.code)
        }
       )
        


    }


  return (
    <>
    <ToastContainer/>
    <div className='flex justify-center items-center w-full md:py-24 '>
      <button className='p-4 rounded-md w-48 shadow-md shadow-slate-700 bg-cyan-400' onClick={signIn}>Sign in with Google</button></div>
    </>
  )
}

export default Login