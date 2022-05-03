import { GetServerSideProps } from 'next';
import React from 'react'
import Login from '../components/auth/Login';

type Props = {
  next:string
}

function login(props: Props) {
  return (
    <div><Login next={props.next} /></div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const eventCode = ctx.query.eventCode && ctx.query.eventCode[0];
  console.log('next',ctx.query.next)
  const next=ctx.query.next as string
 
  return {
    props: {
      next:next?next:null
    },
  };
};
export default login