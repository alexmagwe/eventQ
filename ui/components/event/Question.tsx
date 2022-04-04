import React from 'react'
import { Question } from './types'


function Question(props: Question) {
    const {data}=props
  return (
   <p className='flex flex-col gap-2'>
       <span>{data.userName}</span>
       <span>{data.description}</span>
   </p>
  )
}

export default Question