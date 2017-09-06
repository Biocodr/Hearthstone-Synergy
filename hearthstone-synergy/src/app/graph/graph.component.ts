import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Graph, Node, Link } from './graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    var svg = d3.select('svg');
    var width = +svg.attr('width');
    var height = +svg.attr('height');

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // https://github.com/d3/d3-force/blob/master/README.md#_force
    var simulation = d3.forceSimulation()
      .force('link', d3.forceLink().distance(10).strength(0.5))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    d3.json('../../assets/miserables.json', (error, graph: Graph) => {
      if (error) {
        throw error;
      }

      var nodes = graph.nodes;
      var nodesById = d3.map<Node>(nodes, n => { return n.id; });

      var links = graph.links;
      var bilinks = [];

      links.forEach((link: Link) => {
        // TODO remove unnecessary parts
        var s = nodesById.get(link.source);
        var t = nodesById.get(link.target);
        var i: Node = { id: 'intermediate', group: 0 }; // TODO grouping

        var l1: Link = {
          source: s.id,
          target: i.id,
          value: null
        };

        var l2: Link = {
          source: i.id,
          target: t.id,
          value: null
        };

        nodes.push(i);
        links.push(l1, l2);
        bilinks.push(s, i, t);
      });

      var link = svg.selectAll('.link')
        .data(bilinks)
        .enter().append('path')
          .attr('class', 'link');

      var node = svg.selectAll('.node')
        .data<Node>(nodes.filter(d => { return d.id }))
        .enter().append<SVGCircleElement>('circle')
          .attr('class', 'node')
          .attr('r', 5)
          .attr('fill', d => { return color(d.group.toString()); })
          .call(d3.drag<SVGCircleElement, Node>()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));
      
      node.append('title').text(d => { return d.id; });

      simulation
        .nodes(nodes)
        .on('tick', ticked);

      // simulation.force("link")
      //   .links(links);

      function ticked() {
        link.attr('d', positionLink);
        node.attr('transform', positionNode);
      }
    });

    function positionLink(d): string {
      return "M" + d[0].x + "," + d[0].y
           + "S" + d[1].x + "," + d[1].y
           + " " + d[2].x + "," + d[2].y;
    }

    function positionNode(d): string {
      return "translate(" + d.x + "," + d.y + ")";
    }

    function dragStarted(this: SVGCircleElement, d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(this: SVGCircleElement, d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragEnded(this: SVGCircleElement, d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }
}
