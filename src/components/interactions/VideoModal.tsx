import { Box, Modal } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { fetchViewUrl } from '@/utils/S3Handler';

import LoadingDot from '../LoadingDot';
import VideoPlayer from '../VideoPlayer';

// box styles
const styles = {
  minWidth: 800,
  minHeight: 500,
  bgcolor: 'rgba(0,0,0)',
  boxShadow: 50,
  borderRadius: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

interface Props {
  open: boolean;
  onClose: () => any;
  video: any | null;
}

const VideoModal = ({ video, open, onClose }: Props) => {
  // const [enabled, setEnabled] = React.useState(false);

  const videoFileName = useMemo(() => {
    if (!video) return '';
    return video?.S3Link?.fileName;
  }, [video]);

  const { data, isLoading, isError } = useQuery(['video', videoFileName], {
    // enabled,
    queryFn: () => fetchViewUrl(videoFileName as string),
  });

  // useEffect(() => {
  //   if (!data) setEnabled(true);
  // }, [videoFileName, data]);

  const src = React.useMemo(() => data?.url, [data]);

  if (!open) return null;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={styles}>
          <div className="h-full w-full text-white">
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center">
                <LoadingDot />
              </div>
            )}
            {isError && <h2>Something went wrong</h2>}
            {!isLoading && !isError && <VideoPlayer src={src} />}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default VideoModal;
