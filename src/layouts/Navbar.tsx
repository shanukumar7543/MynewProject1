// import Link from 'next/link';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [exampleModal, setExampleModal] = useState(false);
  const [resorseseModal, setResorseseModal] = useState(false);
  const [toggle, setToggel] = useState(false);

  const handleSetResorseseModal = () => {
    setResorseseModal((prev) => !prev);
  };

  const handleClickExampleModal = () => {
    setExampleModal((prev) => !prev);
  };

  const handleClick = () => {
    setClick((prev) => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const exampleModalRef = useRef<HTMLDivElement>(null);

  const resorseseModalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exampleModalRef.current &&
        !exampleModalRef.current.contains(event.target as Node)
      ) {
        setExampleModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resorseseModalRef.current &&
        !resorseseModalRef.current.contains(event.target as Node)
      ) {
        setResorseseModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ">
      <div className="mx-auto flex w-full flex-wrap items-center justify-between py-3 ">
        <div
          className="mx-3 flex w-full flex-col place-content-between md:block"
          id="navbar-multi-level "
        >
          <div className="flex w-full justify-between rounded-lg border border-gray-100 bg-green-200 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <div className="flex justify-between">
              <h1 className="flex items-center justify-center px-3">
                <Image
                  src="/logo.png"
                  width={40}
                  height={40}
                  className="mr-1 h-8 text-white"
                  alt="VidyChat Logo"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  VidyChat
                </span>
              </h1>

              {/* Small Devices */}
              <div className="flex space-x-8 md:hidden">
                <ul>
                  <li className="md:hidden ">
                    <Link href="/signup">
                      <button
                        className="h-10 w-20 rounded-3xl bg-black text-white"
                        type="button"
                      >
                        Sign up
                      </button>
                    </Link>
                  </li>
                </ul>

                <button
                  onClick={() => {
                    setToggel(!toggle);
                  }}
                  data-collapse-toggle="navbar-multi-level"
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                  aria-controls="navbar-multi-level"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              {/* Small Devices End */}
            </div>

            <div className="hidden justify-between text-white sm:hidden md:hidden lg:flex">
              <ul className="my-auto flex items-center space-x-8">
                <li>
                  <button type="button">Product</button>
                </li>

                <li className="relative">
                  <div
                    ref={dropdownRef}
                    className="cursor-pointer"
                    onClick={handleClick}
                    role="presentation"
                  >
                    <ul className="flex">
                      <li>Solutions</li>
                      <li>
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {click ? (
                    <ul className="absolute mt-4 h-40 w-44 space-y-6 rounded-3xl bg-white p-3 text-left text-black no-underline drop-shadow-2xl">
                      <li className="no-underline">
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Recruitment
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Sales & Marketing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Other
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>

                <li>
                  <button type="button">Pricing</button>
                </li>

                <li className="relative cursor-pointer">
                  <div
                    onClick={handleClickExampleModal}
                    role="presentation"
                    ref={exampleModalRef}
                  >
                    <ul className="flex">
                      <li>Examples</li>
                      <li>
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {exampleModal ? (
                    <ul className="absolute mt-4 h-40 w-48 space-y-6 rounded-3xl bg-white p-3 text-left text-black  drop-shadow-2xl">
                      <li className="">
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Templates
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Case Studies
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Inspiration Examples
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>

                <li className="relative cursor-pointer">
                  <div
                    onClick={handleSetResorseseModal}
                    role="presentation"
                    ref={resorseseModalRef}
                  >
                    <ul className="flex">
                      <li>Resources</li>
                      <li>
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {resorseseModal ? (
                    <ul className="absolute mt-4 h-40 w-36 space-y-6  rounded-3xl bg-white p-3 text-left text-black   drop-shadow-2xl">
                      <li>
                        <Link className=" text-black" href="/">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link className=" text-black" href="/">
                          Community
                        </Link>
                      </li>
                      <li>
                        <Link className=" text-black" href="/">
                          Help Center
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>

                {/* lg: Auth Buttons */}
                <div className="flex space-x-3">
                  <li>
                    <Link href="/login" className="hover:border-none">
                      <button
                        className="rounded-3xl bg-slate-200 px-5 py-1.5 text-black hover:bg-gray-700 hover:text-slate-200"
                        type="button"
                      >
                        Log in
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link href="/signup" className="hover:border-none">
                      <button
                        className="rounded-3xl bg-black px-5 py-1.5 text-white hover:bg-gray-700"
                        type="button"
                      >
                        Sign up
                      </button>
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </div>

          {/* Small Devices Menu */}
          {toggle ? (
            <div className=" absolute z-20 ml-0  mt-16 min-h-full w-full  bg-white pl-5  pt-6   md:flex lg:hidden ">
              <ul className=" space-y-8 font-light  ">
                <li>
                  <button type="button">Product</button>
                </li>

                <li className="">
                  <div
                    ref={dropdownRef}
                    className="cursor-pointer"
                    onClick={handleClick}
                    role="presentation"
                  >
                    <ul className="flex">
                      <li>Solutions</li>
                      <li>
                        {' '}
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {click ? (
                    <ul className=" absolute mt-4 h-40  w-44 space-y-6 rounded-3xl bg-white p-3 text-left text-black no-underline drop-shadow-2xl">
                      <li className="no-underline">
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Recruitment
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Sales & Marketing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="  text-black no-underline underline-offset-0"
                        >
                          Other
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>

                <li>
                  <button type="button">Pricing</button>
                </li>

                <li className=" cursor-pointer">
                  <div
                    onClick={handleClickExampleModal}
                    role="presentation"
                    ref={exampleModalRef}
                  >
                    <ul className="flex">
                      <li>Examples</li>
                      <li>
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {exampleModal ? (
                    <ul className="absolute mt-4 h-40 w-44 space-y-6 rounded-3xl bg-white p-3 text-left text-black  drop-shadow-2xl">
                      <li className="">
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Templates
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Case Studies
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ textDecoration: 'none' }}
                          className=" text-black"
                          href="/"
                        >
                          Inspiration Examples
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>

                <li className=" cursor-pointer">
                  <div
                    onClick={handleSetResorseseModal}
                    role="presentation"
                    ref={resorseseModalRef}
                  >
                    <ul className="flex">
                      <li>Resources</li>
                      <li>
                        <ArrowDropDownIcon />
                      </li>
                    </ul>
                  </div>
                  {resorseseModal ? (
                    <ul className=" absolute mt-4 h-40 w-36 space-y-6  rounded-3xl bg-white p-3 text-left text-black   drop-shadow-2xl">
                      <li>
                        <Link className=" text-black" href="/">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link className=" text-black" href="/">
                          Community
                        </Link>
                      </li>
                      <li>
                        <Link className=" text-black" href="/">
                          Help Center
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </li>
              </ul>
            </div>
          ) : null}
          {/* End of Small Devices Menu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
