import { Injectable } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from '../models';
import * as d3 from 'd3';

@Injectable()
export class D3Service {

    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
    constructor() { }

    /** A method to bind a pan and zoom behaviour to an svg element */
    applyZoomableBehaviour(svgElement, containerElement) {
        let svg = d3.select(svgElement);
        let container = d3.select(containerElement);

        let zoomed = () => {
            let transform = d3.event.transform;
            container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        }

        let zoom = d3.zoom().on("zoom", zoomed);
        svg.call(zoom);
    }

    /** A method to bind a draggable behaviour to an svg element */
    applyDraggableBehaviour() { }

    /** The interactable graph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
        return new ForceDirectedGraph(nodes, links, options);
    }
}