/* eslint-disable no-underscore-dangle */
import { Position } from 'reactflow';

import ArrowIcon from '@/icons/arrowIcon';
// import PlusIcon from '@/icons/plusIcon';

let initNodes: any = [];
let initEdges: any = [];

export const getnodesandedges = async (data: any) => {
  const initialNodes: any = [];
  const initialEdges: any = [];

  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      width: 150,
      height: 130,
      overflow: 'hidden',
      borderRadius: '10%',
    },
  };

  const getInputNode = data.response.stepsData.filter(
    (el: any) => el.stepType === 'INPUT' && el.vidychatId === data.vidychatid
  );
  const getOutputNode = data.response.stepsData.filter(
    (el: any) => el.stepType === 'OUTPUT' && el.vidychatId === data.vidychatid
  );
  const getCustomNode = data.response.stepsData.filter(
    (el: any) => el.stepType === 'CUSTOM' && el.vidychatId === data.vidychatid
  );

  const inputNodes = [
    {
      id: `${getInputNode[0]._id}`,
      type: 'input',
      position: getInputNode[0]?.position
        ? getInputNode[0]?.position
        : { x: 0, y: 0 },
      data: {
        label: <ArrowIcon />,
      },
      nextStepId: `${getInputNode[0].answersData?.map(
        (answer: any) => answer.nextStepId
      )}`,
      ...nodeDefaults,
    },
    // Add more objects here if needed
  ];

  initialNodes.push(...inputNodes);

  const { nextStepId } = getInputNode[0].answersData[0];

  // insert custom node
  const customNode = await getCustomNode.map((el: any) => {
    return {
      id: `${el._id}`,
      position: el?.position !== undefined ? el.position : { x: 0, y: 0 },
      type: 'custom',
      data: {
        thumbnail: el?.thumbnail[0]?.S3Link?.fileName,
      },
      nextStepId: `${el.answersData.map((answer: any) => answer.nextStepId)}`,
      ...nodeDefaults,
    };
  });

  const datas = [];
  let i = 0;

  do {
    if (customNode[i].id === nextStepId) {
      datas.push(customNode[i]);
    }
    i++;
  } while (i < customNode.length);

  let j = 0;
  while (j < datas.length) {
    const currentData = datas[j];
    const matchingNode = customNode.find(
      (node: any) => node.id === currentData.nextStepId
    );

    if (matchingNode) {
      // Do something with the matching node
      datas.push(matchingNode);
    }

    j++;
  }

  const addPositions = datas.map((el, index) => {
    return {
      id: `${el.id}`,
      position:
        el?.position.x !== 0 && el?.position?.y !== 0
          ? el?.position
          : { x: (index + 1) * 400, y: 0 },
      type: 'custom',
      data: {
        thumbnail: el?.data?.thumbnail,
        stepnumber: index + 1,
        name: data?.response?.name,
      },
      nextStepId: `${el.nextStepId}`,
      ...nodeDefaults,
    };
  });

  addPositions.forEach((obj: any) => {
    initialNodes.push(obj);
  });

  // get largest position

  let largestX = Number.MIN_SAFE_INTEGER;

  addPositions.forEach((obj) => {
    const { x } = obj.position;
    if (x > largestX) {
      largestX = x;
    }
  });

  // insert output node

  initialNodes.push({
    id: `${getOutputNode[0]._id}`,
    position: getOutputNode[0]?.position
      ? getOutputNode[0]?.position
      : { x: largestX + 400, y: 0 },
    type: 'output',
    ...nodeDefaults,
  });

  // const uniqueArray = [];
  // const seenIds = new Set();

  // for (const item of initNodes) {
  //   if (!seenIds.has(item.id)) {
  //     uniqueArray.push(item);
  //     seenIds.add(item.id);
  //   }
  // }

  //     console.log(uniqueArray , "in uniqueArray helper")

  for (let i = 0; i < initialNodes.length - 1; i++) {
    initialEdges.push({
      id: `${initialNodes[i].id}` + `${initialNodes[i].nextStepId}`,
      source: `${initialNodes[i]?.id}`,
      target: `${initialNodes[i]?.nextStepId}`,
      // style: { weight: '30px' },
      style: {
        stroke: 'black',
        strokeWidth: 2,
        arrowHeadType: 'arrowclosed',
      },
      label: '+',
      animated: false,
    });
  }

  initNodes = [];
  initEdges = [];

  initNodes = initNodes.concat(initialNodes);
  initEdges = initEdges.concat(initialEdges);
};

export { initEdges, initNodes };
