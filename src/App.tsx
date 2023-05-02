import { useCallback } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import 'reactflow/dist/style.css';
import { zinc } from 'tailwindcss/colors';
import ReactFlow, {
  Background,
  Controls,
  BackgroundVariant,
  Node,
  ConnectionMode,
  useEdgesState,
  Connection,
  addEdge,
  useNodesState
} from 'reactflow';
import { Square } from './components/nodes/Square';
import DefaultEdge from './components/edges/DefaultEdge';

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 600,
      y: 400,
    },
    data: {}
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChanges] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  function addSquarNode() {
    setNodes(nodes => [...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 1000,
          y: 500,
        },
        data: {}
      },
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        edgeTypes={EDGE_TYPES}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChanges}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background
          variant={BackgroundVariant.Cross}
          gap={16}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>

      <Toolbar.Root
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden"
      >
        <Toolbar.Button
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2"
          onClick={addSquarNode}
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
