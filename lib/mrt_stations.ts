import Graph from 'graphology';
import { UndirectedGraph } from 'graphology';

type NodeAttributes = {
  name: string;
}

type EdgeAttributes = {
  weight: number;
}

type GraphAttributes = {
  name?: string;
}

const graph = new UndirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>();


// Adding graph nodes. Node ID is the station code.
// East West Line — Main Line (EW1 to EW33)
//graph.addNode("EW1",  { name: "Pasir Ris" });
// graph.addNode("EW2",  { name: "Tampines" });


// Displaying useful information about your graph
console.log('Number of nodes', graph.order);
console.log('Number of edges', graph.size);

