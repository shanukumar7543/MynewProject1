import { useQuery } from '@tanstack/react-query';
import React from 'react';

import LoadingDot from '@/components/LoadingDot';
import { fetchViewUrl } from '@/utils/S3Handler';

import AudioPlayer from '../../AudioPlayer';

interface VideoProps {
  type?: 'audio/mp3' | 'audio/webm';
  fileName: string;
}

const Video = ({ fileName, type = 'audio/mp3' }: VideoProps) => {
  const [enabled, setEnabled] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const { data, isLoading, isError } = useQuery([fileName], {
    enabled,
    queryFn: () => fetchViewUrl(fileName),
  });

  const src = React.useMemo(() => data?.url, [data]);

  React.useEffect(() => {
    if (!data) setEnabled(true);
    else {
      setAnimate(true);
    }
    return () => setAnimate(false);
  }, [fileName, data]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingDot />
      </div>
    );

  if (isError) return <h2>Something went wrong</h2>;

  return (
    <div
      className={`h-full w-full !rounded-md ${
        animate ? 'animate-slide-up' : ''
      }`}
      animate-y-distance="100px"
    >
      {/* <h2 className="absolute left-10 top-10 z-50">{fileName}</h2> */}
      <AudioPlayer src={src} type={type} />
    </div>
  );
};

export default Video;
