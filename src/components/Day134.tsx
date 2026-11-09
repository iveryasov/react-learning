import { useState } from "react";

// Day 134
// Server monitoring panel

interface ServerNode {
    id: string;
    name: string;
    region: "us-east" | "eu-central" | "sa-east";
    status: "healthy" | "warning" | "offline" | "rebooting";
    cpuUsage: number; // from 0 to 100
}

const INITIAL_NODES: ServerNode[] = [
    { id: "1", name: "node-us-alpha", region: "us-east", status: "healthy", cpuUsage: 28 },
    { id: "2", name: "node-eu-beta", region: "eu-central", status: "warning", cpuUsage: 84 },
    { id: "3", name: "node-sa-gamma", region: "sa-east", status: "healthy", cpuUsage: 45 },
    { id: "4", name: "node-us-delta", region: "us-east", status: "offline", cpuUsage: 0 },
    { id: "5", name: "node-eu-epsilon", region: "eu-central", status: "healthy", cpuUsage: 35 },
    { id: "6", name: "node-sa-zeta", region: "sa-east", status: "warning", cpuUsage: 79 },
];

function Day134() {
    // States:
    const [nodes, setNodes] = useState<ServerNode[]>(INITIAL_NODES);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("All");

    const normalizedSearch = searchTerm.toLowerCase().trim();

    const filteredNodes = nodes.filter((node) => {
        const matchesSearch = node.name.includes(normalizedSearch);
        const matchesFilter = selectedStatus === "All" || selectedStatus.toLowerCase() === node.status;
        return matchesSearch && matchesFilter;
    });

    const avgCpu = filteredNodes.length === 0 ? 
        0 :
        filteredNodes.reduce((sum, node) => sum + node.cpuUsage, 0) / filteredNodes.length;

    const rebootNode = (id: string) => {
        setNodes(prev => prev.map(node => node.id === id ? { ...node, status: "rebooting" } : node));
    };

    return (
        <div>
            <h2>Cloud Fleet Cluster Manager</h2>
            <div>
                <label htmlFor="searchInput">Search:</label>
                <input type="text" placeholder="node..." id="searchInput" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                <label htmlFor="filterSelect">Filter:</label>
                <select id="filterSelect" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Warning">Warning</option>
                    <option value="Offline">Offline</option>
                    <option value="Rebooting">Rebooting</option>
                </select>

                <p>Avg CPU: <span>{avgCpu.toFixed(0)}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNodes.map(node => 
                    <div key={node.id} className="bg-slate-900 border border-slate-800 rounded-xl text-white p-5 flex flex-col justify-between">
                        <h3>{node.name}</h3>
                        <p>Status: {node.status}</p>
                        <p>Region: {node.region}</p>
                        <p>CPU load: {node.cpuUsage}</p>
                        <button onClick={() => rebootNode(node.id)} disabled={node.status === "rebooting"}>Reboot</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Day134;