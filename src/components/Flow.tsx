import 'reactflow/dist/style.css';

import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import type { Connection, Edge } from 'reactflow';
// import PlusIcon from '@/icons/plusIcon';
import ReactFlow, {
  addEdge,
  Background,
  ControlButton,
  Controls,
  // Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import { updateBulkPositionOfSteps, updateStep } from '@/apihelpers/api';
import { initEdges, initNodes } from '@/utils/Node_Edge_Helper';

// import ArrowIcon from '@/icons/arrowIcon';
import CustomNode from './Custom_Nodes';
import InputNode from './Input_Node';
import OutputNode from './Output_Node';
import Viewpage from './Viewpage';

interface VidyChatData {
  vidychatdata: any;
  setShowSidebarHeader: (setShowSidebarHeader: boolean) => void;
}

const nodeTypes = {
  input: InputNode,
  custom: CustomNode,
  output: OutputNode,
};

const BasicFlow = (props: VidyChatData) => {
  const [loading, setLoading] = useState(false);
  const [stepId, setStepId] = useState('');
  const [showViewComponent, setShowViewComponent] = useState(false);
  const router = useRouter();

  const currentURL = router.asPath;

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fitView, setFitView] = useState(true);

  useEffect(() => {
    setNodes(initNodes);
    setEdges(initEdges);
  }, [initNodes, initEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const handleOnNodesClick = (_event: any, node: any) => {
    setStepId(node.id);
    router.push(`${currentURL}&stepId=${node.id}`);
    setShowViewComponent(true);
    props.setShowSidebarHeader(false);
  };

  const handleEdgeClick = (_data: any, edge: any) => {
    router.push(
      `/createVideo/vidy/?vidychatid=${router.query.vidychatid}&source=${edge.source}&target=${edge.target}`
    );
  };

  const handleNodeDragStop = async (_value: any, node: any) => {
    const stepUpdate = await updateStep({
      stepId: node?.id,
      position: {
        x: node?.position?.x,
        y: node?.position?.y,
      },
    });
    if (stepUpdate?.status === 200) {
      toast.success('updated successfully');
    }

    console.log(stepUpdate, 'step is updated');
  };

  // console.log(onNodesChange, "node changed")

  const handleArrangeClick = async () => {
    const arrangedNodes = nodes.map((node, index) => ({
      ...node,
      position: { x: index * 400, y: 0 },
    }));
    setNodes(arrangedNodes);
    setFitView(true);

    const getIdsandPosition = arrangedNodes.map((el) => {
      return {
        stepIds: el.id,
        position: el.position,
      };
    });

    const updatePositions = await updateBulkPositionOfSteps(getIdsandPosition);

    if (updatePositions?.status === 200) {
      toast.success('updated successfully');
    }
  };

  return (
    <>
      {showViewComponent ? (
        <Viewpage
          setShowViewComponent={setShowViewComponent}
          stepId={stepId}
          vidyChatData={props.vidychatdata}
          setShowSidebarHeader={props.setShowSidebarHeader}
        />
      ) : (
        <div className="top-[15%] z-30 flex h-[85%] w-screen">
          {loading && (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodeClick={handleOnNodesClick}
              onEdgeClick={handleEdgeClick}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView={fitView}
              minZoom={0.2}
              onNodeDragStop={handleNodeDragStop}
            >
              <Controls style={{ marginRight: '10px' }}>
                <ControlButton onClick={handleArrangeClick} title="action">
                  <div>1</div>
                </ControlButton>
              </Controls>
              <Background />
            </ReactFlow>
          )}
        </div>
      )}
      <Toaster />
    </>
  );
};

export default BasicFlow;
