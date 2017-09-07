import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../services';
import { Node, ForceDirectedGraph } from '../models';

@Directive({
    selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
    @Input('draggableNode') node: Node;
    @Input('draggableInGraph') graph: ForceDirectedGraph;

    constructor(
        private d3Service: D3Service,
        private element: ElementRef
    ) { }

    ngOnInit(): void {
        this.d3Service.applyDraggableBehaviour(this.element.nativeElement, this.node, this.graph);
    }
}