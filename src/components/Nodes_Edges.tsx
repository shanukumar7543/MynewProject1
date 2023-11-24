import { Position } from 'reactflow';

import ArrowIcon from '@/icons/arrowIcon';
import PlusIcon from '@/icons/plusIcon';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    // borderRadius: '100%',
    backgroundColor: '#fff',
    width: 70,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'input',
    data: {
      label: <ArrowIcon />,
    },
    ...nodeDefaults,
  },
  {
    id: '2',
    position: { x: 250, y: -100 },
    data: {
      label: <PlusIcon />,
    },
    ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 250, y: 100 },
    data: {
      label: 'Step 3',
      imageSrc: <ArrowIcon />,
    },
    ...nodeDefaults,
  },
  {
    id: '4',
    position: { x: 500, y: 0 },
    type: 'output',
    data: {
      label: '🟦',
    },
    ...nodeDefaults,
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: '+',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: '+',
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: '+',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: '+',
  },
];

export { initialEdges, initialNodes };
