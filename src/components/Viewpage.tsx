/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import HelpIcon from '@mui/icons-material/Help';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import {
  buttonApi,
  getAnswer,
  mcqAdd,
  mcqCreate,
  mcqDel,
  mcqUpdate,
  openAdd,
  openDel,
} from '@/apihelpers/api';
// import { useRouter } from 'next/dist/client/router';
import CustomNode from '@/components/Custom_Node1';

interface ViewPageProps {
  setShowViewComponent: (setShowViewComponent: boolean) => void;
  stepId: string;
  vidyChatData: any;
  setShowSidebarHeader: (setShowSidebarHeader: boolean) => void;
}

const Viewpage = (props: ViewPageProps) => {
  const [activeTab, setActiveTab] = useState('answer');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Open Ended');
  const [videFileName, setVideoFileName] = useState('');
  const router = useRouter();
  const [choices, setChoices] = useState<string[]>(['']);
  const [ButtonValue, setButtonValue] = useState('okay');
  const { stepId } = router.query;
  const [isVideoChecked, setIsVideoChecked] = useState(true);
  const [isAudioChecked, setIsAudioChecked] = useState(true);
  const [choiceCounter, setChoiceCounter] = useState(1);
  const [isTextChecked, setIsTextChecked] = useState(true);

  // Function to handle checkbox change for Video
  const handleVideoChange = () => {
    setIsVideoChecked(!isVideoChecked);
  };

  // Function to handle checkbox change for Audio
  const handleAudioChange = () => {
    setIsAudioChecked(!isAudioChecked);
  };

  useEffect(() => {
    if (isVideoChecked) {
      openAdd({
        stepId,
        answerType: '64c38998f8c4d35fb8fc6a17',
        answer: {
          category: 'OPEN_ENDED',
          responseType: 'video',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openAdd API call for video successful');
          } else {
            console.error('openAdd API call for video failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openAdd API for video', error);
        });
    } else {
      openDel({
        stepId,
        answer: {
          responseType: 'video',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openDel API call for video successful');
          } else {
            console.error('openDel API call for video failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openDel API for video', error);
        });
    }
  }, [isVideoChecked]);

  useEffect(() => {
    if (isAudioChecked) {
      openAdd({
        stepId,
        answerType: '64c38998f8c4d35fb8fc6a17',
        answer: {
          category: 'OPEN_ENDED',
          responseType: 'audio',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openAdd API call for audio successful');
          } else {
            console.error('openAdd API call for audio failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openAdd API for audio', error);
        });
    } else {
      openDel({
        stepId,
        answer: {
          responseType: 'audio',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openDel API call for audio successful');
          } else {
            console.error('openDel API call for audio failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openDel API for audio', error);
        });
    }
  }, [isAudioChecked]);

  useEffect(() => {
    if (isTextChecked) {
      openAdd({
        stepId,
        answerType: '64c38998f8c4d35fb8fc6a17',
        answer: {
          category: 'OPEN_ENDED',
          responseType: 'text',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openAdd API call for text successful');
          } else {
            console.error('openAdd API call for text failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openAdd API for text', error);
        });
    } else {
      openDel({
        stepId,
        answer: {
          responseType: 'text',
        },
      })
        .then((response) => {
          if (response.success) {
            console.log('openDel API call for text successful');
          } else {
            console.error('openDel API call for text failed', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calling openDel API for text', error);
        });
    }
  }, [isTextChecked]);

  useEffect(() => {
    if (selectedOption === 'Button') {
      const data = {
        stepId,
        answerType: '64c38d71f8c4d35fb8fc6a19',
        answers: {
          category: 'BUTTON',
          responseType: 'click',
          text: ButtonValue,
        },
      };

      buttonApi(data)
        .then((response) => {
          if (response.success) {
            // Handle success - response.data contains the API response data
            console.log('API call successful:', response.data);
          } else {
            // Handle API error - response.data contains the error information
            console.error('API call error:', response.data);
          }
        })
        .catch((error) => {
          // Handle unexpected errors
          console.error('API call error:', error);
        });
    }
  }, [selectedOption, ButtonValue, stepId]);

  useEffect(() => {
    if (selectedOption === 'Multiple Choice') {
      const data = {
        stepId,
        answerType: '64c74832217b27999ffab131',
        answers: {
          category: 'MULTICHOICE',
          responseType: 'click',
          text: choices[0],
        },
      };

      mcqCreate(data)
        .then((response) => {
          if (response.success) {
            // Handle success - response.data contains the API response data
            console.log('API call successful:', response.data);
          } else {
            // Handle API error - response.data contains the error information
            console.error('API call error:', response.data);
          }
        })
        .catch((error) => {
          // Handle unexpected errors
          console.error('API call error:', error);
        });
    }
  }, [selectedOption, choices, stepId, ButtonValue]);

  // Function to handle checkbox change for Text
  const handleTextChange = () => {
    setIsTextChecked(!isTextChecked);
  };

  const updateChoice = async (updatedChoice: string, index: number) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = updatedChoice;
    setChoices(updatedChoices);

    // Call mcqUpdate here with the updated choice
    try {
      await mcqUpdate({
        stepId: 'yourStepId',
        nextStepId: 'yourNextStepId',
        answer: {
          category: 'MULTICHOICE',
          responseType: 'click',
          text: updatedChoice,
        },
      });
    } catch (error) {
      console.error('Error updating choice:', error);
    }
  };
  // Function to add a new choice
  const addChoice = async () => {
    const updatedChoices = [...choices, `Option ${choiceCounter}`]; // Predefined value with option number
    setChoices(updatedChoices);
    setChoiceCounter(choiceCounter + 1);
    const lastChoice = updatedChoices[updatedChoices.length - 1]; // Get the last choice
    try {
      await mcqAdd({
        stepId,
        nextStepId: 'yourNextStepId',
        answerType: '64c74832217b27999ffab131',
        answer: {
          category: 'MULTICHOICE',
          responseType: 'click',
          text: lastChoice, // Use the last choice as the text
        },
      });
    } catch (error) {
      console.error('Error adding choice:', error);
    }
  };
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleOptionSelect = async (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    await getAnswer({
      stepId,
      answerType: '65slvdnkalknssdfv2432345',
      nextStepId: '65slvdnkalknssdfv24323t4',
    });
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  useEffect(() => {
    const stepData = props?.vidyChatData?.response?.stepsData.filter(
      (el: any) => el._id === props.stepId
    );
    setVideoFileName(stepData[0]?.videoDetails?.S3Link?.fileName);
  }, []);

  const handleClose = () => {
    const { pathname, query } = router;
    delete query.stepId;
    router.replace({
      pathname,
      query,
    });
    props.setShowViewComponent(false);
    props.setShowSidebarHeader(true);
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-zinc-200">
      <CustomNode
        videoFileName={videFileName}
        selectedOption={selectedOption}
        ButtonValue={ButtonValue}
        choices={choices}
        isVideoChecked={isVideoChecked}
        isTextChecked={isTextChecked}
        isAudioChecked={isAudioChecked}
      />
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
        <div className="100% flex">
          <div className="ml-6 h-8 w-8 place-content-center items-center rounded-3xl bg-violet-600 text-white">
            {/* Video Number from Backend */}
          </div>
        </div>
        <div className="flex w-[100%] grow flex-col overflow-y-auto px-6">
          <input
            placeholder="Title 1 (only visible to you)"
            className="text-md mt-4 h-10 w-full rounded-lg bg-violet-50 p-3 outline-none ring-purple-600 focus:ring-2"
          />
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
                      activeTab === 'video'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('video')}
                    // role="tab"
                    aria-selected={activeTab === 'video'}
                    aria-controls="video"
                  >
                    <span className="ml-1">Video</span>
                  </button>
                </li>
                {/* Answer Tab */}
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'answer'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('answer')}
                    // role="tab"
                    aria-selected={activeTab === 'answer'}
                    aria-controls="answer"
                  >
                    <span className="ml-1">Answer</span>
                  </button>
                </li>
                {/* Logic Tab */}
                <li className="z-30 flex text-center">
                  <button
                    type="button"
                    className={`z-30 mb-0 flex cursor-pointer items-center justify-center border-0 bg-inherit px-0 py-1 font-semibold ${
                      activeTab === 'logic'
                        ? 'text-purple-700 underline underline-offset-8'
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleTabClick('logic')}
                    // role="tab"
                    aria-selected={activeTab === 'logic'}
                    aria-controls="logic"
                  >
                    <span className="ml-1">Logic</span>
                  </button>
                </li>
              </ul>
              <div data-tab-content="" className="p-5">
                {/* video Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'video' ? '' : 'hidden'
                  }`}
                  id="video"
                  role="tabpanel"
                >
                  <div className="mt-4 flex h-44 w-full overflow-hidden rounded-2xl bg-black">
                    <div className="z-35 relative flex h-12 w-full">
                      <div className="absolute top-32 flex h-12 w-full flex-row items-center justify-end gap-x-1.5 bg-black px-4">
                        <div className="top-0 z-40 flex h-8 w-24 flex-row items-center justify-center rounded-lg bg-white font-semibold  transition-transform duration-200 ease-in-out hover:scale-105">
                          <img
                            src="/replace.svg"
                            alt="replace"
                            className="h-[18px] w-[18px] pr-1"
                          />
                          Replace
                        </div>
                        <div className="top-0 z-40 flex h-8 w-8 items-center justify-center rounded-lg bg-white  transition-transform duration-200 ease-in-out hover:scale-105">
                          <img
                            src="/cut.svg"
                            alt="cut"
                            className="h-[20px] w-[20px]"
                          />
                        </div>
                        <div className="top-0 z-40 flex h-8 w-8 items-center justify-center rounded-lg bg-white  transition-transform duration-200 ease-in-out hover:scale-105">
                          <img
                            src="/cc.svg"
                            alt="cc"
                            className="h-[25px] w-[25px]"
                          />
                        </div>
                        <div className="top-0 z-40 flex h-8 w-8 items-center justify-center rounded-lg bg-white  transition-transform duration-200 ease-in-out hover:scale-105">
                          <img
                            src="/message.svg"
                            alt="message"
                            className="h-[20px] w-[20px]"
                          />
                        </div>
                        <div className="top-0 z-40 flex h-8 w-8 items-center justify-center rounded-lg bg-white  transition-transform duration-200 ease-in-out hover:scale-105">
                          <img
                            src="/download.svg"
                            alt="download"
                            className="h-[20px] w-[20px]"
                          />
                        </div>
                      </div>
                    </div>
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
                  <div className="mb-8 font-semibold">
                    Adjust video position
                    <HelpIcon />
                  </div>
                  <div className="flex h-16 w-full flex-col items-center justify-center">
                    <div className="flex h-4 w-full flex-row items-center justify-center">
                      <div className="mx-6 flex h-4 w-4 border-l-2 border-t-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-t-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-r-2 border-t-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                    </div>
                    <div className="mt-6 flex h-4 w-full flex-row items-center justify-center">
                      <div className="mx-6 flex h-4 w-4 border-l-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-r-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                    </div>
                    <div className="mt-6 flex h-4 w-full flex-row items-center justify-center">
                      <div className="mx-6 flex h-4 w-4 border-b-2 border-l-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-b-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                      <div className="mx-6 flex h-4 w-4 border-b-2 border-r-2 border-black bg-zinc-200 p-1 hover:border-green-600 hover:bg-zinc-300" />
                    </div>
                  </div>
                  <div className="mt-8 text-sm font-semibold">
                    <p>Overlay text:</p>
                    <textarea
                      // rows='3'
                      name="videoaskname"
                      // value={inputValue}
                      // onChange={handleInputChange}
                      placeholder="Add  Overlay text here...(Optional)"
                      className="my-2 flex w-full rounded-xl bg-white bg-zinc-200 p-5 text-sm font-semibold focus:outline-none"
                    />
                    <a
                      href="xfb"
                      className="text-sm font-semibold text-green-500"
                    >
                      Learn how to pipe variables (e.g name) into overlay text
                    </a>
                  </div>
                </div>
                {/* Answer Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'answer' ? '' : 'hidden'
                  }`}
                  id="answer"
                  role="tabpanel"
                >
                  <p className="text-blue-gray-500 block font-sans text-sm font-bold leading-relaxed text-gray-500 text-inherit antialiased">
                    Select answer type:
                  </p>
                  {/* Dropdown component */}
                  <div
                    className="relative inline-block w-[100%] text-left"
                    ref={dropdownRef}
                  >
                    <div>
                      <button
                        type="button"
                        className="mt-4 inline-flex w-[100%] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        onClick={handleDropdownClick}
                      >
                        {selectedOption}
                        <svg
                          className="-mr-1 h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {/* ... SVG path ... */}
                        </svg>
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        // tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('Open Ended')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/video.svg" alt="screenRecording" />
                              Open Ended
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('AI Chatbot')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/options.svg" alt="screenRecording" />
                              AI Chatbot
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() =>
                              handleOptionSelect('Multiple Choice')
                            }
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/options.svg" alt="screenRecording" />
                              Multiple Choice
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('Button')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/button.svg" alt="screenRecording" />
                              Button
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('Calendar')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/calender.svg" alt="screenRecording" />
                              Calendar
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('Live Call')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img
                                src="/ComputerProfile.svg"
                                alt="screenRecording"
                              />
                              Live Call
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('NPS')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/smile.svg" alt="screenRecording" />
                              NPS
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('File Upload')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/Upload2.svg" alt="screenRecording" />
                              File Upload
                            </div>
                          </button>
                          <button
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            onClick={() => handleOptionSelect('Payment')}
                          >
                            <div className="flex items-center gap-x-2">
                              <img src="/payment.svg" alt="screenRecording" />
                              Payment
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedOption === 'Open Ended' && (
                      <div className="mt-2 w-full  transition-all duration-300">
                        {/* Content for Open Ended option */}
                        <div className="mt-4 flex items-center  justify-between font-semibold">
                          Video
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              className="peer sr-only"
                              onChange={handleVideoChange}
                              checked={isVideoChecked}
                            />
                            <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                          </label>
                        </div>
                        <div className="mt-4 flex items-center  justify-between font-semibold">
                          Audio
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              className="peer sr-only"
                              onChange={handleAudioChange}
                              checked={isAudioChecked}
                            />
                            <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                          </label>
                        </div>
                        <div className="mt-4 flex items-center justify-between font-semibold">
                          Text
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              value=""
                              className="peer sr-only"
                              onChange={handleTextChange}
                              checked={isTextChecked}
                            />
                            <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                          </label>
                        </div>
                      </div>
                    )}
                    {selectedOption === 'Button' && (
                      <div className="text-md mt-2 w-full text-zinc-400 transition-all duration-300">
                        {/* Content for AI Chatbot option */}
                        Call to action text:
                        <input
                          placeholder="e.g. Get started..."
                          className="text-md mt-2 h-10 w-full rounded-lg bg-violet-50 p-3 outline-none ring-purple-600 focus:ring-2"
                          value={ButtonValue}
                          onChange={(e) => setButtonValue(e.target.value)}
                        />
                      </div>
                    )}
                    {selectedOption === 'Multiple Choice' && (
                      <div className="mt-2 w-full transition-all duration-300">
                        {/* Existing Choices */}
                        {choices.map((choice, x) => (
                          <div key={x} className="flex items-center">
                            <input
                              type="text"
                              value={choice}
                              className="text-md w-50 mt-3 h-8 rounded-lg bg-zinc-200 px-3 outline-none ring-purple-600 focus:ring-2"
                              onChange={(e) => updateChoice(e.target.value, x)}
                            />
                            {x > 0 && (
                              <button
                                type="button"
                                className="h-full w-full items-center justify-center"
                                onClick={() => {
                                  const updatedChoices = choices.filter(
                                    (_, i) => i !== x
                                  );
                                  mcqDel(choice);
                                  setChoices(updatedChoices);
                                }}
                              >
                                <img
                                  src="/Remove.svg"
                                  alt="remove"
                                  className="ml-[10px] mt-[12px] h-4 w-4"
                                />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Add New Choice */}
                        <div className="mt-2 flex items-center">
                          <button
                            type="button"
                            onClick={addChoice}
                            className="mr-2 flex flex-col items-center"
                          >
                            <span>
                              <img
                                src="/Add.svg"
                                alt="Add"
                                className="h-6 w-6"
                              />{' '}
                              Add Choice
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between font-semibold">
                    <p className="text-sm font-semibold">
                      Time limit on video/audio
                      <HelpIcon />
                    </p>
                    <input
                      placeholder="120"
                      className="text-md h-10 w-12 rounded-lg bg-zinc-200 px-3 outline-none ring-purple-600 focus:ring-2"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-between font-semibold">
                    <p className="text-sm font-semibold">
                      Delay interaction
                      <HelpIcon />
                    </p>
                    <input
                      placeholder="0"
                      className="text-md h-10 w-12 rounded-lg bg-zinc-200 px-3 outline-none ring-purple-600 focus:ring-2"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-between font-semibold">
                    <p className="text-sm font-semibold">
                      Collect contact details on this step
                      <HelpIcon />
                    </p>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        value=""
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                    </label>
                  </div>
                  <Link
                    href="Some Value"
                    className="text-sm font-bold text-green-500 underline hover:no-underline "
                  >
                    Edit contact form
                  </Link>
                </div>
                {/* Logic Tab Content */}
                <div
                  className={`block opacity-100 ${
                    activeTab === 'logic' ? '' : 'hidden'
                  }`}
                  id="logic"
                  role="tabpanel"
                >
                  <div className="mt-4 flex items-center  justify-between font-semibold">
                    Advanced Logic
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="group flex h-14 w-full items-center justify-center bg-gray-900 text-lg font-bold text-zinc-400 hover:bg-black hover:text-green-700"
            onClick={handleClose}
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

export default Viewpage;
