// Define the data for nodes and links with labels
const nodes = [
    { id: "Node 1" },
    { id: "Node 2" },
    { id: "Node 3" },
    { id: "Node 4" },
];

const links = [
    { source: "Node 1", target: "Node 2", label: "Edge 1" },
    { source: "Node 1", target: "Node 3", label: "Edge 2" },
    { source: "Node 2", target: "Node 4", label: "Edge 3" },
    { source: "Node 3", target: "Node 4", label: "Edge 4" },
];

// Set up SVG dimensions
const width = 600;
const height = 400;

// Append an SVG element to the #graph-container div
const svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Initialize the force simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Add lines for links
const link = svg.selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke", "#aaa")
    .style("stroke-width", 2);

// Add labels for links (edges)
const linkLabels = svg.selectAll(".link-label")
    .data(links)
    .enter()
    .append("text")
    .attr("class", "link-label")
    .text(d => d.label)
    .style("font-size", "10px")
    .style("fill", "#555");

// Add circles for nodes
const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", "#69b3a2");

// Add labels to nodes
const nodeLabels = svg.selectAll(".node-label")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "node-label")
    .text(d => d.id)
    .style("font-size", "12px")
    .style("fill", "#333");

// Update positions on each tick
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    linkLabels
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    nodeLabels
        .attr("x", d => d.x + 12)
        .attr("y", d => d.y + 4);
});
