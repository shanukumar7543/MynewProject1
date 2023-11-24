import HelpIcon from '@mui/icons-material/Help';
// import { useRouter } from 'next/dist/client/router';
// import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import CustomNode from '@/components/Custom_Node1';

interface SettingsProps {
  showSettingPage: any;
  vidychatdata: any;
  showFunnelPage: any;
  showContactPage: any;
}

const SettingPage = (props: SettingsProps) => {
  const [activeTab, setActiveTab] = useState('general');
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [videFileName, setVideoFileName] = useState('');
  // const router = useRouter();

  const handleTabClick = (tabId: React.SetStateAction<string>) => {
    setActiveTab(tabId);
  };

  // const handleDropdownClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // setIsDropdownOpen(false);
    }
  };

  // const handleOptionSelect = (option: React.SetStateAction<string>) => {
  //   setSelectedOption(option);
  //   setIsDropdownOpen(false);
  // };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const handleClose = () => {
    props.showSettingPage(false);
    props.showFunnelPage(true);
    props.showContactPage(false);
  };

  return (
    <div className="flex h-screen w-screen flex-row">
      <CustomNode />
      <div className="right-left-rightleft absolute right-0 flex h-[100%] w-[100%] flex-col bg-white lg:w-1/3 xl:w-1/4">
        <div className="mr-2 mt-2 flex w-[100%] flex-row place-content-end">
          <div className="flex h-[30px] w-[30px] items-center justify-center bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/minimize.svg" alt="screenRecording" />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/bin.svg" alt="screenRecording" />
          </div>
          <div
            className="flex h-[30px] w-[30px] items-center justify-center bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105"
            onClick={handleClose}
          >
            <img src="/cross.svg" alt="screenRecording" />
          </div>
        </div>

        <div className="flex w-[100%] grow flex-col overflow-y-auto px-6">
          <div className="mt-4 w-[100%] ">
            <div className="relative right-0">
              <ul
                className="bg-blue-gray-50/60 relative flex list-none flex-wrap gap-x-4 rounded-xl p-1 font-semibold"
                data-tabs="tabs"
                // role="list"
              >
                {/* video Tab */}
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'general'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('general')}
                    // role="tab"
                    aria-selected={activeTab === 'general'}
                    aria-controls="general"
                  >
                    <span className="ml-1">General</span>
                  </button>
                </li>
                {/* Answer Tab */}
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'recording'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('recording')}
                    // role="tab"
                    aria-selected={activeTab === 'recording'}
                    aria-controls="recording"
                  >
                    <span className="ml-1">Recording</span>
                  </button>
                </li>
                {/* Logic Tab */}
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'thumbnail'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('thumbnail')}
                    // role="tab"
                    aria-selected={activeTab === 'thumbnail'}
                    aria-controls="thumbnail"
                  >
                    <span className="ml-1">Thumbnail</span>
                  </button>
                </li>
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'advanced'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('advanced')}
                    // role="tab"
                    aria-selected={activeTab === 'advanced'}
                    aria-controls="advanced"
                  >
                    <span className="ml-1">Advanced</span>
                  </button>
                </li>
              </ul>
              <div data-tab-content="" className="p-5">
                {/* General Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'general' ? '' : 'hidden'
                  }`}
                  id="general"
                  role="tabpanel"
                >
                  <div>
                    <h1 className="text-gray-600">Name of videoask:</h1>
                    <input
                      value="Untitled"
                      className="text-md mt-2 h-10 w-full rounded-lg bg-violet-50 p-3 outline-none ring-purple-600 focus:ring-2"
                    />
                  </div>

                  <div className="my-4 flex items-center justify-between font-semibold">
                    <div>
                      Fit Video
                      <HelpIcon />
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        value=""
                        className="peer sr-only"
                        // onClick={() => setValue('consent2', !form.consent2)}
                        // checked={form.consent2}
                      />
                      <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                    </label>
                  </div>
                </div>
                {/* Recording Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'recording' ? '' : 'hidden'
                  }`}
                  id="recording"
                  role="tabpanel"
                />
                {/* Thumbnail Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'thumbnail' ? '' : 'hidden'
                  }`}
                  id="thumbnail"
                  role="tabpanel"
                />
                {/* Advanced Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'advanced' ? '' : 'hidden'
                  }`}
                  id="advanced"
                  role="tabpanel"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="group flex h-14 w-full items-center justify-center bg-gray-900 text-lg font-bold text-zinc-400 hover:bg-black hover:text-green-700"
          >
            Done
            <span className="transition-transform duration-500 group-hover:scale-110">
              👌
            </span>{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
