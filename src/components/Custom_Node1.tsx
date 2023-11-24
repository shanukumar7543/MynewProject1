import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { addContactByFunnel, getVideo } from '@/apihelpers/api';

import ButtonField from './ButtonField';
import Multichoice from './Multichoice';
import Openended from './Openended';
import VideoPlayer from './VideoPlayer';

interface StepProps {
  videoFileName?: string;
  hide?: boolean;
  isChecked?: boolean;
  contactFields?: any;
  selectedIds?: any;
  vidychatdata?: any;
  textareaValue?: any;
  consentData?: any;
  showSettingPage?: any;
  showFunnelPage?: any;
  showContactPage?: any;
  selectedOption?: string;
  ButtonValue?: any;
  choices?: string[];
  isAudioChecked?: boolean;
  isVideoChecked?: boolean;
  isTextChecked?: boolean;
}

const CustomNode = (props: StepProps) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      if (props.videoFileName) {
        try {
          const response = await getVideo({
            Key: props?.videoFileName,
          });

          // Assuming your getVideo response contains a property "videoUrl"
          if (response.status === 200) {
            setVideoSrc(response?.data?.url);
          }
        } catch (error) {
          console.error('Error fetching video:', error);
        } finally {
          setIsLoading(false); // Set loading state to false when done
        }
      }
    };

    fetchVideo();
  }, [props.videoFileName, props.selectedOption, props.ButtonValue]);

  console.log(props, 'in contact');

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e?.preventDefault();
    if (props?.selectedIds.length === 0) {
      return toast.error('Please select a step');
    }
    for (const id of props.selectedIds) {
      try {
        const result = await addContactByFunnel({
          vidyChatId: props?.contactFields?.vidyChatId,
          stepId: id,
          contactData,
          organizationID: props?.vidychatdata?.organizationId,
        }); // Replace with your API call function

        if (result) {
          props.showSettingPage(false);
          props.showFunnelPage(true);
          props.showContactPage(false);
        }
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
      }
    }
  };

  const handleInputChange = async (e: any, label: any) => {
    setContactData((prevContactData) => {
      // Find the index of the item to update
      const itemIndex = prevContactData.findIndex(
        (item: any) => item.label === label
      );

      // Create a copy of the previous state to avoid mutating it
      const updatedContactData: any = [...prevContactData];

      // If the item exists, update its labelData
      if (itemIndex !== -1) {
        updatedContactData[itemIndex] = {
          label,
          labelData: e.target.value,
        };
      } else {
        // If the item doesn't exist, add it to the array
        updatedContactData.push({
          label,
          labelData: e.target.value,
        });
      }

      return updatedContactData;
    });
  };

  return (
    <div
      className={`absolute left-0 hidden h-[100%] items-center justify-center p-[7.5%] hover:bg-zinc-200 ${
        isLoading ? 'zoom-in-animation bg-zinc-400' : ''
      } lg:flex lg:w-2/3 xl:w-3/4`}
    >
      <div className="flex w-96 flex-col overflow-hidden  rounded-lg border-2 bg-white shadow-2xl shadow-md transition duration-300 ease-in-out lg:h-[360px] xl:h-[470px] xl:w-[68%] ">
        <div className="flex h-[5%] w-[100%] items-center gap-x-2 bg-zinc-200 px-2 text-[9px] font-semibold">
          <div className="h-2 w-2 rounded-full bg-zinc-400" />
          <div className="h-2 w-2 rounded-full bg-zinc-400" />
          <div className="h-2 w-2 rounded-full bg-zinc-400" />
        </div>
        <div className="flex h-[95%] w-[100%]">
          <div className="flex h-[100%] w-[50%] items-center justify-center bg-black text-white">
            {/* <video
            src={videoSrc}
            controls
            className="h-full w-full object-cover hover:grayscale"
          /> */}
            <VideoPlayer src={videoSrc} />
          </div>
          {props.isChecked ? (
            <form
              onSubmit={handleSubmit}
              className="m-0 inline-block h-[100%] w-[50%] overflow-y-auto p-3"
            >
              <div className="ml-[1px]  overflow-auto p-12  text-[15px] font-semibold">
                <h1>
                  Before you go, please leave your contact details so we can get
                  back to you...
                </h1>
                {props?.contactFields?.contactData?.length &&
                  props?.contactFields?.contactData?.map(
                    (item: any, index: any) => {
                      return (
                        <div key={index}>
                          <input
                            placeholder={`${item?.isRequired ? '*' : ''}Your ${
                              item?.label
                            }`}
                            className="mt-[1rem] w-full  border-b border-gray-200 bg-transparent text-[13px] focus:outline-none "
                            required={!!item?.isRequired}
                            onChange={(e) => handleInputChange(e, item.label)}
                          />
                        </div>
                      );
                    }
                  )}

                {/* <input placeholder='*Your Email' className='w-full mt-[1rem]  bg-transparent border-b border-black focus:outline-none text-[13px] '/>
              <input placeholder='*Your product name' className='w-full mt-[1rem]  bg-transparent border-b border-black focus:outline-none text-[13px] '/>
              <input placeholder='*Your phone number' className='w-full mt-[1rem]  bg-transparent border-b border-black focus:outline-none text-[13px] '/> */}
                {props?.contactFields?.consent && (
                  <div className="mt-[1rem] flex  text-[10px]">
                    <input type="checkbox" id="myCheckbox" name="myCheckbox" />
                    <div className="w-40">{props.consentData}</div>
                  </div>
                )}
                {props?.contactFields?.note && (
                  <div className="mt-4 ">
                    <p className="text-[10px]">Add any additional text here</p>
                    <input
                      className="mt-[1rem] w-full  border-b border-gray-200 bg-transparent text-[13px] focus:outline-none "
                      value={props.textareaValue}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  placeholder="Enter Something:"
                  className="mt-4 w-full rounded bg-blue-500 px-10 py-3 text-white transition-all duration-100 hover:scale-105"
                >
                  Send your answer
                </button>
              </div>
              <Toaster />
            </form>
          ) : (
            <div className="flex h-[100%] w-[50%] items-center justify-center bg-white text-black">
              {props.selectedOption === 'Open Ended' && (
                <Openended
                  isAudioChecked={props.isAudioChecked}
                  isVideoChecked={props.isVideoChecked}
                  isTextChecked={props.isTextChecked}
                />
              )}
              {props.selectedOption === 'Button' && (
                <ButtonField ButtonValue={props.ButtonValue} />
              )}
              {props.selectedOption === 'Multiple Choice' && (
                <Multichoice choices={props.choices} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
