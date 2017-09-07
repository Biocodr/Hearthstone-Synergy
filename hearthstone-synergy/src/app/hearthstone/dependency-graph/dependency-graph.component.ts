import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

import { Node, Link } from '../../d3';
import { Card } from '../card';

@Component({
    selector: 'dependency-graph',
    templateUrl: './dependency-graph.component.html',
    styleUrls: ['./dependency-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependencyGraphComponent {
    private chartData: Array<any>;

    nodes: Node[] = [];
    links: Link[] = [];

    constructor() {
        this.generateHearthstoneData();
    }

    generateHearthstoneData() {
        
        this.createCardNodes();
        // d3.json('../../assets/cards.json', (error, cards: Card[]) => {
        //     if (error) {
        //         throw error;
        //     }

        //     // console.log(cards);

        // });
    }

    createCardNodes() {
        const N = 10;

        for (let i = 1; i <= N; i++) {
            this.nodes.push(new Node(i));
        }

        for (let i = 1; i <= N; i++) {
            for (let j = 2; i * j <= N; j++) {

                this.links.push(new Link(i, j));
            }
        }
    }
}
