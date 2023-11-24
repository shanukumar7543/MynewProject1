import HelpIcon from '@mui/icons-material/Help';
// import { useRouter } from 'next/dist/client/router';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import {
  getContactForm,
  getVideo,
  getVidyChatDataById,
  removeContactForm,
  updateContactForm,
  updateVidyChatData,
} from '@/apihelpers/api';
import CustomNode from '@/components/Custom_Node1';
import Closeicon from '@/icons/closeicon';
import Contacticon from '@/icons/contacticon';
import Eyeicon from '@/icons/eyeicon';
import PlusIcon from '@/icons/plusIcon';
import Showfieldicon from '@/icons/showfieldicon';
import Staricon from '@/icons/staricon';
import Staricon2 from '@/icons/staricon2';

import LoadingSpinner from './LoadingSpinner';

interface ContactProps {
  showSettingPage: any;
  vidychatdata: any;
  showFunnelPage: any;
  showContactPage: any;
}

// interface ContactData {
//   label: string;
//   labelData: string;
//   isRequired: boolean;
//   isVisible: boolean;
//   _id: string;
// }

// interface Contact {
//   _id: string;
//   vidyChatId: string;
//   contactData: ContactData[];
//   updatedAt: string;
//   createdAt: string;
//   __v: number;
// }

interface Thumbnail {
  id: string; // Replace with the actual type of your ID
  thumbnail: {
    url: string;
    // Add other properties as needed
  };
}

const ContactPage = (props: ContactProps) => {
  // const [activeTab, setActiveTab] = useState('general');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('Open Ended');
  // const [videFileName, setVideoFileName] = useState('');
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);
  const [contactFields, setContactFields] = useState<any>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemBeingRemoved, setItemBeingRemoved] = useState(null);
  const [isCheckedConsent, setisCheckedConsent] = useState(false);
  const [consentData, setConsentData] = useState(
    '* [Sample legal text] The personal data you have provided will be processed by XXXXX for purposes of providing you the service. The legal basis of the processing is XXXXX. Your data will not be transferred nor assigned to third parties. You can exercise your right to access, rectify and delete your data, as well as the other rights granted by law by sending an email to XXXXX. For further information, please check our privacy policy XXXXX.'
  );
  const [addNote, setAddNote] = useState(false);
  const [itemRequired, setItemRequired] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState('');
  const [videoFileName, setVideoFileName] = useState('');

  // const handleTabClick = (tabId: React.SetStateAction<string>) => {
  //   setActiveTab(tabId);
  // };
  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);
  };
  const handleconsentData = (event: any) => {
    setConsentData(event.target.value);
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

  useEffect(() => {
    const id = router.query.vidychatid;
    async function fetchData() {
      const response: any = await getVidyChatDataById(id);
      setIsChecked(response?.data?.data?.vidyChat?.contactDetails);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const id = router.query.vidychatid;
    async function fetchData() {
      const response: any = await getContactForm(id);
      // setIsChecked(response?.data?.data?.vidyChat?.contactDetails)
      setContactFields(response?.data?.data[0]);
      setisCheckedConsent(response?.data?.data[0]?.consent);
      setAddNote(response?.data?.data[0]?.note);
    }
    fetchData();
  }, []);

  const handleClose = () => {
    props.showSettingPage(false);
    props.showFunnelPage(true);
    props.showContactPage(false);
  };

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    const data: any = await updateVidyChatData({
      vidychatid: router.query.vidychatid,
      contactDetails: !isChecked,
    });
    if (data?.status === 200) {
      toast.success('updated successfully');
    }
  };

  const handleNewInput = async () => {
    setShowInput(!showInput);
  };

  const handleInput = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    const response: any = await updateContactForm({
      id: contactFields?._id,
      contactData: [
        {
          label: inputData,
          labelData: '',
          isRequired: true,
          isVisible: true,
        },
      ],
    });
    setContactFields(response?.data?.data);
    if (response?.status === 200) {
      toast.success('added successfully');
      setLoading(false);
    }
    setInputData('');
    setShowInput(false);
  };

  const hanldeRemove = async (contact: any) => {
    setLoading(true);
    setItemBeingRemoved(contact?._id);
    const response: any = await removeContactForm({
      id: contactFields?._id,
      elementIdToRemove: contact?._id,
    });
    setContactFields(response?.data?.data);
    if (response?.status === 200) {
      toast.success('removed successfully');
      setLoading(false);
    }
  };

  const handleCheckboxConsentChange = async () => {
    setisCheckedConsent(!isCheckedConsent);
    const response: any = await updateContactForm({
      id: contactFields?._id,
      consent: !isCheckedConsent,
    });
    if (response?.status === 200) {
      toast.success('updated successfully');
      setContactFields(response?.data?.data);
    }
  };

  const handleAddNode = async () => {
    setAddNote(!addNote);
    const response: any = await updateContactForm({
      id: contactFields?._id,
      note: !addNote,
    });
    if (response?.status === 200) {
      toast.success('updated successfully');
      setContactFields(response?.data?.data);
    }
  };

  const handleRequired = async (item: any) => {
    // setIsRequired(!isRequired)
    // setItemRequired(item._id)
    setItemRequired(item._id);
    setLoading(true);
    const response: any = await updateContactForm({
      id: contactFields?._id,
      itemId: item._id,
      isRequired: !item?.isRequired,
    });
    if (response?.status === 200) {
      toast.success('updated successfully');
      setContactFields(response?.data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const customNode = props?.vidychatdata?.stepsData?.filter(
      (el: any) => el.stepType === 'CUSTOM'
    );
    setVideoFileName(customNode[0]?.videoDetails?.S3Link?.fileName);
    const fetchThumbnails = async () => {
      const thumbnailArray = [];
      for (const data of customNode) {
        if (data.thumbnail && Array.isArray(data.thumbnail)) {
          const thumbnailPromises = data.thumbnail.map(
            async (thumbnail: any) => {
              const fileName = thumbnail?.S3Link?.fileName;

              if (fileName) {
                const response = await getVideo({ Key: fileName }); // Call getVideo with the fileName
                if (response.status === 200) {
                  return { id: data._id, thumbnail: response.data }; // Include the ID along with the thumbnail data
                }
              }
              return null; // Return null for unsuccessful fetches
            }
          );

          const thumbnailsForData = await Promise.all(thumbnailPromises); // Wait for all promises to resolve
          thumbnailArray.push(thumbnailsForData);
        }
      }

      setThumbnails(
        thumbnailArray.flat().filter((thumbnail) => thumbnail !== null)
      ); // Set the flattened thumbnails in state
    };
    fetchThumbnails();
  }, []);

  const handleStep = (id: string) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      // If it's selected, remove it
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id)
      );
    } else {
      // If it's not selected, add it
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row">
      <CustomNode
        // videoFileName={videFileName}
        isChecked={isChecked}
        contactFields={contactFields}
        selectedIds={selectedIds}
        vidychatdata={props?.vidychatdata}
        textareaValue={textareaValue}
        consentData={consentData}
        showSettingPage={props?.showSettingPage}
        showFunnelPage={props?.showFunnelPage}
        showContactPage={props?.showContactPage}
        videoFileName={videoFileName}
      />
      <div className="absolute right-0 flex h-[100%] w-[100%] grow flex-col bg-white px-4 lg:w-1/3 xl:w-1/4">
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
        <div className="my-4 flex grow items-center justify-between font-semibold">
          <div className="flex items-center justify-center gap-[0.5rem]">
            <Contacticon />
            Collect Contact Details
            <HelpIcon />
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
          </label>
        </div>

        {isChecked ? (
          <div className="flex w-[100%] grow flex-col overflow-y-auto px-6">
            <hr className="mx-auto mt-5 w-11/12 border border-gray-200" />
            <div className="mt-2 flex justify-between">
              <p>Collect after step...</p>
              <div
                className="relative inline-block w-[100%] text-left"
                ref={dropdownRef}
              >
                <div>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-[30%] justify-between gap-x-1.5 rounded-md bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={handleDropdownClick}
                  >
                    {thumbnails.length &&
                      thumbnails?.map((el: any, index: any) => {
                        const isSelected = selectedIds.includes(el.id);
                        return (
                          <div
                            className="flex items-center justify-between"
                            key={index}
                          >
                            {isSelected && (
                              <img
                                src={el?.thumbnail?.url}
                                alt="screenRecording"
                              />
                            )}
                          </div>
                        );
                      })}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute  mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    // tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      {/* <a
                            href="SomeValue"
                            className="block px-4 py-2 text-sm font-bold text-purple-700"
                            role="menuitem"
                            // tabIndex="-1"
                            id="menu-item-0"
                            onClick={() => handleOptionSelect('Open Ended')}
                          > */}
                      {thumbnails.length &&
                        thumbnails.map((el: any, index: any) => {
                          const isChecked = selectedIds.includes(el.id);
                          return (
                            <div
                              className="flex items-center justify-between p-2"
                              key={index}
                            >
                              <img
                                src={el?.thumbnail?.url}
                                alt="screenRecording"
                                className="h-10 w-10"
                              />
                              <div className="">
                                <input
                                  type="checkbox"
                                  id="myCheckbox"
                                  name="myCheckbox"
                                  value="yes"
                                  className="h-6 w-6 rounded-md border border-gray-300 checked:border-transparent checked:bg-white focus:outline-none"
                                  onClick={() => handleStep(el?.id)}
                                  checked={isChecked}
                                />
                              </div>
                            </div>
                          );
                        })}
                      {/* </a> */}
                    </div>
                  </div>
                )}
              </div>
              <div />
            </div>
            <hr className="mx-auto mt-5 w-11/12 border border-gray-200" />
            {contactFields?.contactData?.length ? (
              contactFields?.contactData?.map((item: any) => {
                return (
                  <div className="mt-5 flex  gap-4 " key={item._id}>
                    <input
                      type="text"
                      className="w-full  rounded border-none bg-gray-300/50 p-2 outline-none placeholder:text-gray-600"
                      disabled
                      placeholder={item?.label}
                    />
                    <button
                      className="rounded bg-gray-300/50 px-2 transition-all duration-75 hover:scale-110"
                      onClick={() => handleRequired(item)}
                    >
                      {item?.isRequired ? (
                        loading && itemRequired === item._id ? (
                          <LoadingSpinner />
                        ) : (
                          <Staricon />
                        )
                      ) : loading && itemRequired === item._id ? (
                        <LoadingSpinner />
                      ) : (
                        <Staricon2 />
                      )}
                    </button>
                    <button
                      className="rounded bg-gray-300/50 px-2 transition-all duration-75 hover:scale-110"
                      onClick={() => hanldeRemove(item)}
                    >
                      {loading && itemBeingRemoved === item?._id ? (
                        <LoadingSpinner />
                      ) : (
                        <Closeicon />
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="bg-black py-4">
                {' '}
                <LoadingSpinner />{' '}
              </div>
            )}
            {showInput ? (
              <form onSubmit={handleInput}>
                <div className="mt-5 flex items-center justify-between gap-[2rem]">
                  <input
                    type="text"
                    className="w-full  rounded border-none bg-gray-300/50 p-2 outline-none placeholder:text-gray-600"
                    // disabled
                    // placeholder={item?.label}
                    id="name"
                    required
                    onChange={(e) => setInputData(e.target.value)}
                    value={inputData}
                  />
                  <button
                    type="submit"
                    className="rounded bg-gray-600 px-2 py-1 transition-all duration-75 hover:scale-110"
                    onClick={() => handleInput}
                  >
                    {loading ? <LoadingSpinner /> : 'Add'}
                  </button>
                </div>
              </form>
            ) : null}
            <div
              className="mt-[1rem] flex items-center justify-between"
              onClick={handleNewInput}
            >
              <h1 className="font-semibold text-gray-600">Add For New Field</h1>
              <div className="rounded bg-gray-300/50 p-2 transition-all duration-75 hover:scale-110">
                <PlusIcon />
              </div>
            </div>
            <hr className="mx-auto mt-5 w-11/12 border border-gray-200" />
            <div className="my-4 flex items-center justify-between font-semibold">
              <div className="flex items-center justify-center gap-[0.5rem]">
                Ask For Consent
                <HelpIcon />
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={isCheckedConsent}
                  onChange={handleCheckboxConsentChange}
                />
                <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
              </label>
            </div>
            {isCheckedConsent ? (
              <div className="flex flex-col">
                <h1>Customize consent text:</h1>
                <textarea
                  className="mt-1 rounded border bg-gray-200 px-4 py-6 text-gray-600 focus:outline-none"
                  value={consentData}
                  onChange={handleconsentData}
                />
              </div>
            ) : null}
            <hr className="mx-auto mt-5 w-11/12 border border-gray-200" />
            <div className="my-4 flex items-center justify-between font-semibold">
              <div className="flex items-center justify-center gap-[0.5rem]">
                Add Note
              </div>
              <button onClick={handleAddNode}>
                {addNote ? <Eyeicon /> : <Showfieldicon />}
              </button>
            </div>
            {addNote && (
              <div className="mb-6 flex flex-col">
                <h1>Customize note:</h1>
                <textarea
                  className="mt-1 rounded border bg-gray-200 px-4 py-6 text-gray-600 focus:outline-none"
                  value={textareaValue}
                  onChange={handleTextareaChange}
                />
              </div>
            )}
          </div>
        ) : null}
        <div className="bottom-0 flex w-full">
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
      <Toaster />
    </div>
  );
};

export default ContactPage;
