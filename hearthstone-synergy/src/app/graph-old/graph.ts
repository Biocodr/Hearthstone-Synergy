export interface Node {
    id: string;
    group: number;
}

export interface Link {
    source: string;
    target: string;
    value: number;
}

export interface Graph {
    nodes: Node[];
    links: Link[];
}