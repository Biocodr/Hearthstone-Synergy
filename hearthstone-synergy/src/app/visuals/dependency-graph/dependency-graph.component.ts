import { Component, ChangeDetectionStrategy, Input, OnInit, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node } from '../../d3';

@Component({
    selector: 'dependency-graph',
    templateUrl: './dependency-graph.component.html',
    styleUrls: ['./dependency-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependencyGraphComponent implements OnInit, AfterViewInit {
    @Input('nodes') nodes;
    @Input('links') links;

    @HostListener('window:resize', ['$event'])
    onresize(event) {
        this.graph.initSimulation(this.options);
    }

    graph: ForceDirectedGraph;
    private _options: { width, height } = { width: 800, height: 600 };

    constructor(
        private d3Service: D3Service,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        // receiving an initialized simulated graph from our custom d3 service
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

        // Binding change detection check on each tick.
        // This along with an onPush change detection strategy should enforce checking only when relevant!
        // This improves scripting computation duration in a couple of tests I've made, consistently.
        // Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
        this.graph.ticker.subscribe((d) => {
            this.ref.markForCheck();
        });
    }

    ngAfterViewInit(): void {
        this.graph.initSimulation(this.options);
    }

    get options() {
        return this._options = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}