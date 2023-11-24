import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import PrimarySideBar from '@/layouts/PrimarySideBar';

interface UserDataProps {
  orgName: string;
  userData: any;
}

const UserSideBar = (props: UserDataProps) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(true);
  const hover = false;

  const handleClick = () => {
    setClick((prev) => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setClick(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToTeamsPage = () => {
    router.push('/teams');
  };

  return (
    <>
      <div className=" flex">
        <PrimarySideBar userData={props?.userData} />

        <div
          className={` h-screen border bg-white  text-black drop-shadow-2xl  ${
            open ? 'w-56' : 'w-16'
          } border-s-indigo-500 `}
        >
          <div className="relative mx-1 cursor-pointer " ref={dropdownRef}>
            {open ? (
              <h1
                onClick={handleClick}
                className={`m-2.5 h-10 w-48 cursor-pointer rounded-lg border-black bg-neutral-200 px-2 py-1 text-left font-normal${
                  !open && 'scale-0'
                }`}
              >
                <ul>
                  <li>
                    {props?.orgName}
                    <ArrowDropDownIcon className="right-2" />
                  </li>
                </ul>
              </h1>
            ) : null}
            {click ? (
              <ul className="absolute ml-2  mt-1 h-32 w-48 space-y-3 rounded-2xl bg-white p-4 text-left text-sm text-black no-underline drop-shadow-2xl">
                <li className="text-gray-600">Set up your org...</li>
                <li className="font-medium">Name your organization</li>
                <li onClick={goToTeamsPage} className="font-medium">
                  Invite your team
                </li>
              </ul>
            ) : null}

            <ArrowCircleLeftIcon
              className={` absolute ${
                hover ? null : 'hidden'
              } -right-3 top-9 rounded-full border-blue-500 bg-slate-200 text-3xl text-blue-700 drop-shadow-2xl ${
                !open && 'rotate-180'
              }`}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>

          <div>
            <div>
              <ul className="mx-1 space-y-1 px-2  py-3">
                <span className="flex  h-10 w-48 rounded-lg pb-3 pt-1.5  hover:bg-neutral-100">
                  <Link href="/home">
                    {' '}
                    <li
                      className={`cursor-pointer ${
                        !open && 'scale-0'
                      } flex pl-2 text-sm text-black no-underline`}
                    >
                      <KeyboardBackspaceIcon
                        fontSize="small"
                        className="mt-0.5"
                      />
                      <p> Back to Inbox</p>
                    </li>
                  </Link>
                </span>

                <span className="flex h-10 rounded-lg pb-3 pt-1.5 font-semibold   hover:bg-neutral-100 hover:text-purple-700">
                  <li className={`cursor-pointer ${!open && 'scale-0'} `}>
                    <Link href="/overview">
                      {' '}
                      <h2 className="pl-2 text-black">My Account</h2>
                    </Link>
                  </li>
                </span>

                <span className="flex h-10 rounded-lg pb-3 pt-1.5 font-semibold hover:bg-neutral-100 hover:text-purple-700">
                  <li className={`cursor-pointer ${!open && 'scale-0'} `}>
                    <h2 className="pl-2">Authorised App</h2>
                  </li>
                </span>

                <span className="flex h-10   rounded-lg pb-3 pt-1.5 font-semibold  hover:bg-neutral-100 hover:text-purple-700 ">
                  <li className={`cursor-pointer ${!open && 'scale-0'} `}>
                    <h2 className="pl-2"> API</h2>
                  </li>
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
