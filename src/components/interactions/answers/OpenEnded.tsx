import React, { useMemo } from 'react';

import Audio from './Audio';
import Text from './Text';
import Video from './Video';

interface OpenEndedProps {
  answer: any;
}

const OpenEnded = ({ answer }: OpenEndedProps) => {
  //
  const renderAnswer = useMemo(() => {
    const answerType = answer.answer?.responseType;
    const fileName = answer?.answer?.S3Link?.filename;

    switch (answerType) {
      case 'video':
        return <Video fileName={fileName} />;
      case 'audio':
        return <Audio fileName={fileName} />;
      case 'text':
        return <Text text={answer.answer?.text} />;
      default:
        return null;
    }
  }, [answer]);

  return <div className="h-full w-full">{renderAnswer}</div>;
};

export default OpenEnded;
