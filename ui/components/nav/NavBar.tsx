import Link from 'next/link'
import React from 'react'
import { auth } from '../../firebase/client'
import { useAuthState } from 'react-firebase-hooks/auth';
import NavDrawer from './NavDrawer';
type Props = {}

function NavBar({}: Props) {
  const user=useAuthState(auth)[0]
  const logOut=()=>{
    auth.signOut()
  }
  
  return (
    <div className='flex px-8 text-inherit md:px-16 py-8 justify-between items-center w-full'>
        <Link href='/'>
        <a className='text-2xl font-sans font-bold'>eventQ</a>
        </Link>
        <NavDrawer/>
    <ul className='hidden md:flex gap-4 justify-center'>
        <Link href='/create'>
          <a>
        <li>Create</li>
          </a>
        </Link>
        <Link href='/join'>
          <a>
        <li>Join</li>
          </a>
        </Link>
          {user&&<Link href='/manage'>
        Manage
          </Link>}
          {user&&<li className='cursor-pointer' onClick={logOut}>
        Logout
          </li>}
        </ul>
        </div>
  )
}

export default NavBar