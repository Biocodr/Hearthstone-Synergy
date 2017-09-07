import { EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { Node } from './node';
import { Link } from './link';

// https://github.com/d3/d3-force/blob/master/README.md
const FORCES = {
    LINK_STRENGTH: link => { return 1 / 10; /*Math.min(link.source, link.target)*/ },
    LINK_DISTANCE: (link: Link, i: number, links:Link[]) => { return 30; }, // default: 30
    COLLISION_STRENGTH: 0.7, // [0, 1], default 0.7
    COLLISION_RADIUS: 10, // bonus distance between nodes
    COLLISION_ITERATION: 1, // [1, ...], default 1
    CHARGE_STRENGTH: (node: Node, i: number, nodes: Node[]) => { 
        return node.r * -1;
     }, // neagtive: repulsion, positive: gravity, default: -30
}

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

    public nodes: Node[] = [];
    public links: Link[] = [];

    constructor(nodes, links, options: { width, height }) {
        this.nodes = nodes;
        this.links = links;

        this.initSimulation(options);
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        // creating the simulation
        if (!this.simulation) {
            const ticker = this.ticker;

            this.simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody()
                    .strength(FORCES.CHARGE_STRENGTH))
                .force("collide", d3.forceCollide()
                    .strength(FORCES.COLLISION_STRENGTH)
                    .radius(d => d['r'] + FORCES.COLLISION_RADIUS)
                    .iterations(FORCES.COLLISION_ITERATION)
                    );

            // connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });

            this.initNodes();
            this.initLinks();
        }

        // updating the central force of the simulation
        this.simulation.force("centers", d3.forceCenter(options.width / 2, options.height / 2));

        // restarting the simulation internal timer
        this.simulation.restart();
    }

    // connectNodes(source, target) {
    //     let link;

    //     if (!this.nodes[source] || !this.nodes[target]) {
    //         throw new Error('One of the nodes does not exist');
    //     }

    //     link = new Link(source, target);
    //     this.simulation.stop();
    //     this.links.push(link);
    //     this.simulation.alphaTarget(0.3).restart();

    //     this.initLinks();
    // }

    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.force('links',
            d3.forceLink(this.links)
                .id(d => d['id'])
                .strength(FORCES.LINK_STRENGTH)
                .distance(FORCES.LINK_DISTANCE)
      );
    }
}
