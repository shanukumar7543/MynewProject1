// import Link from 'next/link';
import { type ReactNode } from 'react';

import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
// import Sidebar from '@/layouts/sidebar';

// import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children?: ReactNode;
};

const Main = (props: IMainProps) => {
  // const accessTocken = localStorage.getItem("accessToken")
  // console.log("accessTocken",JSON.stringify(accessTocken)

  return (
    <>
      {/* {window.location.href === "/login" || "/signup" ? null :
    } */}
      <Navbar />

      <div className="flex ">
        {/* <Sidebar /> */}

        <div className="w-full px-1 text-gray-700 antialiased">
          {props.meta}

          <div className="flex h-[90vh] cursor-pointer items-center justify-center text-center text-6xl font-semibold italic">
            <h1>Welcome to Vidychat</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export { Main };
