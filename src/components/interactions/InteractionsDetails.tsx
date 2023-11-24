/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

import { getHeaders } from '@/apihelpers/api';
import { INTERACTION_BASE } from '@/apihelpers/url_helpers';
import { fetchViewUrl } from '@/utils/S3Handler';

import LoadingDot from '../LoadingDot';
import Multichoice from './answers/MultipleChoice';
import OpenEnded from './answers/OpenEnded';
import { useStore } from './context';
import FloatingBar from './FloatingBar';
import VideoModal from './VideoModal';

type InteractionsDetailsProps = {
  interaction: any;
  invalidate: () => void;
};

const InteractionsDetails = ({
  interaction,
}: // invalidate,
InteractionsDetailsProps) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<any>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const selectedAnswerThumbnailKey = useMemo(() => {
    const thumbnail = selectedAnswer?.stepData?.thumbnail;
    if (!thumbnail) return '/assets/Thumbnail.svg';

    if (Array.isArray(thumbnail)) return thumbnail[0]?.S3Link?.fileName;
    return thumbnail?.S3Link?.fileName;
  }, [selectedAnswer]);

  const { state } = useStore();

  const {
    data,
    isLoading,
    // refetch,
  } = useQuery(['interaction', interaction._id], {
    queryFn: () =>
      fetch(
        `${INTERACTION_BASE}/${interaction._id}?organizationID=${state?.organizationID}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...getHeaders(),
          },
        }
      ).then((res) => res.json()),
    enabled,
    refetchOnWindowFocus: false,
  });

  const { data: selectedAnswerThumbnailUrl } = useQuery(
    ['thumbnail', selectedAnswerThumbnailKey],
    {
      enabled: !!selectedAnswerThumbnailKey,
      queryFn: () => fetchViewUrl(selectedAnswerThumbnailKey),
    }
  );

  const interactionData = useMemo(() => data?.data, [data]);

  React.useEffect(() => {
    if (!data && state?.organizationID) setEnabled(true);
  }, []);

  React.useEffect(() => {
    setSelectedAnswer(interactionData?.answers[0]);
  }, [interactionData]);

  const answers = useMemo(() => {
    const a = interactionData?.answers;
    return a ?? [];
  }, [interactionData]);

  const handleClick = useCallback((answer: any) => {
    console.log(answer);
    setSelectedAnswer(answer);
  }, []);

  const renderAnswer = useMemo(() => {
    const aType = selectedAnswer?.answer?.category;

    switch (aType) {
      case 'OPEN_ENDED':
        return <OpenEnded answer={selectedAnswer} />;
      case 'MULTIPLE_CHOICE':
        return <Multichoice answer={selectedAnswer} />;
      default:
        return null;
    }
  }, [selectedAnswer]);

  if (isLoading)
    return (
      <div className="relative my-auto flex h-[90vh] w-full items-center justify-center rounded-xl bg-white p-8 shadow-lg">
        <LoadingDot />
      </div>
    );

  return (
    interactionData && (
      <div className="relative my-auto h-[90vh] w-full rounded-xl bg-white shadow-lg">
        <div className="h-full w-full md:min-w-[30rem]">{renderAnswer}</div>
        <FloatingBar />

        {/* Top bar */}
        <div className="absolute left-0 top-3 z-50 flex justify-between px-5">
          <div className="flex items-center gap-2 text-white">
            <button
              className="relative h-12 w-12 rounded-md p-0 shadow-xl"
              onClick={() => setIsVideoModalOpen(!isVideoModalOpen)}
            >
              <Image
                src={selectedAnswerThumbnailUrl?.url ?? '/assets/Thumbnail.svg'}
                alt="Steps Thumbnail"
                className="h-full w-full rounded object-cover"
                width={500}
                height={500}
              />
              <AiFillPlayCircle
                className="absolute bottom-1 right-1 fill-white"
                size={20}
              />
            </button>
            <VideoModal
              video={selectedAnswer?.stepData?.videoDetails}
              open={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
            />
            <p>{interactionData.vidyChatName}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 z-50 w-full">
          <div className="px-4">
            <h2 className="text-2xl font-semibold">
              <span
                className={`
                ${
                  interaction?.contact?.name &&
                  interaction?.contact?.name === 'Anonymous'
                    ? selectedAnswer?.answer?.category === 'OPEN_ENDED' &&
                      ['audio', 'video'].includes(
                        selectedAnswer?.answer?.category?.responseType
                      )
                      ? 'text-black'
                      : 'text-white'
                    : 'text-green-600'
                }
                `}
              >
                {interaction?.contact?.name ?? 'Anonymous'}
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              {dayjs(interaction.createdAt).from(Date.now())}
            </p>
          </div>
          <div className="flex w-full gap-3 overflow-x-auto px-4 pb-2 pt-5">
            {answers?.map((answer: any, i: number) => (
              <div key={`answer-${i}`} onClick={() => handleClick(answer)}>
                <Image
                  src="/assets/images/thumb_text_black.svg"
                  width={50}
                  height={50}
                  className={`w-24 cursor-pointer rounded-xl border-4 transition-all duration-300 ease-in-out ${
                    selectedAnswer?._id === answer._id
                      ? 'animate-slide-up -translate-y-3 border-purple-600'
                      : 'animate-slide-down border-transparent opacity-90'
                  }`}
                  alt="thumb_text_black"
                  data-animate-y-distance="-0.75 rem"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default InteractionsDetails;
