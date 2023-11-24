'use client';

/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi';

import LoadingDot from './LoadingDot';

// import { MdOutlineFullscreenExit } from 'react-icons/md';

// const videos = [
//   'https://www.appsloveworld.com/wp-content/uploads/2018/10/640.mp4',
//   'https://www.appsloveworld.com/wp-content/uploads/2018/10/sample-mp4-video.mp4',
// ];

type VideoProps = {
  initial?: boolean;
  src: string;
  type?: 'video/mp4' | 'video/webm' | 'video/ogg' | 'video/mkv';
};

const speedList = [1, 1.5, 2, 3];
const VideoPlayer = ({ src, type = 'video/mp4' }: VideoProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const srcRef = React.useRef<HTMLSourceElement>(null);
  const [progress, setPropgress] = React.useState(0);
  const container = React.useRef<HTMLDivElement>(null);
  const [started, setStarted] = React.useState(false);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [speed, setSpeed] = React.useState(speedList[0]);
  const [fullscreen, setFullscreen] = React.useState(false);
  // const [caption, setCaption] = React.useState(false);
  const [currTime, setCurrTime] = React.useState('00:00');
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load video on mount
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.load();
  }, []);

  const changeSpeed = () => {
    const index = speedList.indexOf(speed!);
    const nextIndex = index + 1 === speedList.length ? 0 : index + 1;
    setSpeed(speedList[nextIndex]);
  };

  // reload video on src change
  React.useEffect(() => {
    if (!ref.current || !srcRef.current) return;
    srcRef.current.src = src;

    // load video
    ref.current.load();
  }, [src]);

  React.useEffect(() => {
    // check if video is loaded or not, if not then load it
    if (!ref.current) return;
    if (ref.current.readyState === 0) {
      ref.current.load();
    }
  }, [src]);

  // ================= { Play / Pause } =================
  React.useEffect(() => {
    if (playing) ref.current?.play();
    else ref.current?.pause();
  }, [playing]);

  // ================= { Mute } =================
  React.useEffect(() => {
    if (!ref.current) return;
    if (muted) ref.current.muted = true;
    else ref.current.muted = false;
  }, [muted]);

  // ================= { Mute } =================
  React.useEffect(() => {
    if (!ref.current) return;
    if (!started) ref.current.muted = true;
  }, [started]);

  // ================= { Speed } =================
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.playbackRate = speed!;
  }, [speed]);

  // ================= { Fullscreen } =================
  React.useEffect(() => {
    if (!container.current) return;
    try {
      if (fullscreen) container.current.requestFullscreen();
      /* eslint-disable-next-line no-extra-boolean-cast */ else if (
        document.fullscreenElement
      )
        document?.exitFullscreen();
    } catch (e) {
      // eslint-disable-next-line no-console -- TODO */
      console.error(e);
    }

    // also set fullscreen false on fullscreen close (esc)
    const onFullscreenChange = () => {
      setFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [fullscreen]);

  React.useEffect((): any => {
    const vid = ref.current;
    if (!vid) return;
    vid.load();

    const updateProgress = () => {
      if (vid.duration > 0) {
        setPropgress(vid.currentTime / vid.duration);
      }
    };

    vid.addEventListener('timeupdate', updateProgress);

    // set current time
    const onTimeUpdate = () => {
      const time = vid.currentTime;
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
      setCurrTime(`${formattedMinutes}:${formattedSeconds}`);
    };
    vid.addEventListener('timeupdate', onTimeUpdate);
    vid.addEventListener('ended', () => {
      setPlaying(false);
    });
    // set loaded true when video is loaded
    vid.addEventListener('loadeddata', () => {
      setIsLoaded(true);
    });
    return () => {
      vid.removeEventListener('timeupdate', updateProgress);
      vid.removeEventListener('timeupdate', onTimeUpdate);
      vid.removeEventListener('ended', () => {
        setPlaying(false);
      });
      vid.removeEventListener('loadeddata', () => {
        setIsLoaded(true);
      });
    };
  }, []);

  const handleStart = () => {
    if (!ref.current) return;
    if (!started) {
      ref.current.currentTime = 0;
      // setMuted(false);
      setStarted(true);
    } else {
      setPlaying(!playing);
    }
  };

  return (
    <div
      className="relative h-full max-w-full"
      style={{ borderRadius: 'inherit' }}
      ref={container}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          {/* <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-500 border-b-red-100 bg-transparent" /> */}
          <LoadingDot />
        </div>
      )}

      {started && (
        <>
          <div className="absolute inset-0 z-50 h-1.5 w-full bg-gray-50/30 backdrop-blur-md">
            <div
              className="h-full bg-purple-500 transition-all duration-150 ease-in-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div
            className={`absolute inset-0 z-50 ml-auto mt-4 max-h-max max-w-max pr-2 text-white ${
              !isLoaded && 'hidden'
            }`}
          >
            <div className="ml-auto flex justify-center gap-x-1">
              <p className="my-auto mr-1 text-sm font-semibold">
                {currTime} / {ref.current?.duration}
              </p>

              <button
                type="button"
                className={`flex h-7 items-center justify-center rounded border-2 border-white p-1 transition-all duration-150 ease-in-out ${
                  muted ? 'bg-transparent text-white' : 'bg-white text-black'
                }`}
                onClick={(e: any) => {
                  e.preventDefault();
                  setMuted(!muted);
                }}
              >
                {muted ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
              </button>

              <button
                type="button"
                className={`flex h-7 items-center justify-center rounded border-2 border-white p-0 transition-all duration-150 ease-in-out ${
                  speed !== 1
                    ? 'bg-white text-black'
                    : 'bg-transparent px-1 text-white'
                }`}
                onClick={changeSpeed}
              >
                {speed}x
              </button>

              {/* <button
                type="button"
                className="flex h-7 items-center justify-center rounded border-2 border-white p-1 font-bold transition-all duration-150 ease-in-out"
                onClick={() => setFullscreen(!fullscreen)}
              >
                {fullscreen ? (
                  <MdOutlineFullscreenExit />
                ) : (
                  <MdOutlineFullscreen />
                )}
              </button> */}

              {/* <button
                type="button"
                className={`max-h-max min-w-[5px] rounded border-2 border-white px-2 py-0 font-bold tracking-widest transition-all duration-150 ease-in-out ${
                  caption ? 'bg-white text-black' : 'bg-transparent text-white'
                }`}
                onClick={() => setCaption(!caption)}
              >
                CC
              </button> */}
            </div>
          </div>
        </>
      )}

      <div className=" relative h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          preload="auto"
          ref={ref}
          style={{ borderRadius: 'inherit' }}
        >
          <source ref={srcRef} src={src} type={type} />
          {/* {caption && (
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src="/lightbulbs-moving-in-the-wind.vtt"
              default
            />
          )} */}
        </video>

        {isLoaded && (
          <button
            type="button"
            className="group absolute inset-0 z-40 flex h-full w-full items-center justify-center transition-all duration-150 ease-in-out"
            onClick={handleStart}
            style={{
              backgroundColor:
                !playing || !started ? 'rgba(0,0,0,0.2)' : 'transparent',
              backdropFilter: !playing || !started ? 'blur(1px)' : 'none',
              borderRadius: 'inherit',
            }}
          >
            {(!playing || !started) && (
              <p className="flex items-center justify-center rounded-full bg-white/20 p-2 text-6xl transition-all duration-150 hover:bg-white/30 group-hover:scale-110">
                <BsPlayFill className="text-white" size={30} />
              </p>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
