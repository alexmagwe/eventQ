import React from "react";
import Link from "next/link";
import { auth } from "../../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
type Props = {};
function NavDrawer({}: Props) {
  const user = useAuthState(auth)[0];
  const [openDrawer, setOpenDrawer] = useState(false);
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div className="absolute flex flex-col justify-center items-center right-0 top-12 ">
      <button
        className="visible  md:hidden"
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
          { openDrawer === false?<div className="flex gap-2 flex-col">
          <div className="w-[25px] h-[2px] bg-white"></div>
          <div className="w-[25px] h-[2px] bg-white"></div>
          <div className="w-[25px] h-[2px] bg-white"></div>
          </div>:<div className="mb-4">
          <div className="w-[25px] rotate-45 h-[2px] bg-white"></div>
          <div className="w-[25px] h-[2px] -rotate-45 bg-white"></div>
          </div>
          }
          </button>
      <div
        className={` bg-slate-800 rounded-md p-8 ${
          openDrawer === true
            ? "translate-x-0 transform transition duration-500 ease-in-out"
            : "translate-x-full transform transition duration-500 ease-in-out"
        }
`}
      >
        <ul
          className={`sm:flex md:hidden sm:flex-col justify-center items-start gap-4`}
        >
          <Link href="/create">
            <a>
              <li>Create</li>
            </a>
          </Link>
          <Link href="/join">
            <a>
              <li>Join</li>
            </a>
          </Link>
          {user && <Link href="/manage">Manage</Link>}
          {user && (
            <li className="cursor-pointer" onClick={logOut}>
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavDrawer;
